import Product from "../schemas/productSchema.js";

//Repository functions for Product model

//Function to add a new product

export const addProductRepository = async (productData) => {
    try {
        const product = await Product.create(productData);
        return product;
    } catch (error) {
        console.log("Error in addProductRepository: ", error);
        throw new Error("Could not add product from repository due to ", error);
    }
}

//Function to delete a product by ID

export const deleteProductRepository = async (productId) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return deletedProduct;
    } catch (error) {
        console.log("Error in deleteProductRepository: ", error);
        throw new Error("Could not delete product from repository due to ", error);
    }
}

//Function to update a product by ID

export const updateProductRepository = async (productId, updatedData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        return updatedProduct;
    } catch (error) {   
        console.log("Error in updateProductRepository: ", error);
        throw new Error("Could not update product from repository due to ", error);
    }
}

//Function to get all products

export const getAllProductsRepository = async (sort = { createdAt: -1 }, skip = 0, limit = 12, search = '') => {
    try {
        // Build query based on search term
        let query = {};
        
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { subTitle: { $regex: search, $options: 'i' } },
                    { productId: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Get total count for pagination
        const totalProducts = await Product.countDocuments(query);
        
        // Get products with pagination and sorting
        const products = await Product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        return {
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Math.floor(skip / limit) + 1
        };
    } catch (error) {
        console.log("Error in getAllProductsRepository: ", error);
        throw new Error("Could not fetch products: " + error.message);
    }
};

//Function to get a product by ID

export const getProductByIdRepository = async (productId) => {
    try {
        const product = await Product.findById(productId);
        
        return product;
    } catch (error) {
        console.log("Error in getProductByIdRepository: ", error);
        throw new Error("Could not fetch product from repository due to ", error);
    }
}

export const getProductByProducIdRepository = async (productId) => {
    try {
        const product = await Product.find({ productId: productId }).populate('category').populate('subCategory').populate('filters.filter').populate('filters.filterItem').populate('specifications.specification');
        return product;
    } catch (error) {
        console.log("Error in getProductByProducIdRepository: ", error);
        throw new Error("Could not fetch product from repository due to " + error);
    }
}

export const getProductsByGroupIdRepsository = async (groupId) => {
    try {
        const products = await Product.find({ groupId: groupId }).populate('category').populate('subCategory').populate('filters.filter').populate('filters.filterItem').populate('specifications.specification');
        return products;
    } catch (error) {
        console.log("Error in getProductsByGroupIdRepsository: ", error);
        throw new Error("Could not fetch products from repository due to " + error);
    }
}

//repositories for product listing with filters and pagination

// Alternative version matching your original query structure
export const getProductsBySubcategoryRepository = async (subCategoryId, filters, page) => {
    try {
        const limit = 5;
        const query = { subCategory: subCategoryId };

        // Apply price range filter
        if (filters.priceRange && Array.isArray(filters.priceRange)) {
            const [minPrice, maxPrice] = filters.priceRange;
            if (minPrice > 0 || maxPrice < 30000) {
                query.price = { $gte: minPrice, $lte: maxPrice };
            }
        }

        // Apply filter items - combine all filter item IDs from all filters
        const allFilterItemIds = [];
        
        for (const filterKey in filters) {
            if (filterKey !== 'priceRange' && Array.isArray(filters[filterKey])) {
                allFilterItemIds.push(...filters[filterKey]);
            }
        }
        
        // If there are any filter items selected, apply them
        if (allFilterItemIds.length > 0) {
            query['filters.filterItem'] = { $in: allFilterItemIds };
        }

        console.log("Final query:", query);

        const products = await Product.find(query)
            .populate('category')
            .populate('subCategory')
            .populate('filters.filter')
            .populate('filters.filterItem')
            .populate('specifications.specification')
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count for pagination
        const totalCount = await Product.countDocuments(query);

        return {
            products: products,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    } catch (error) {
        console.log("Error in getProductsBySubcategory: ", error);
        throw new Error("Could not fetch products: " + error.message);
    }
};

export const addReviewToProductRepository = async (productId, reviewData) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.review.push(reviewData);
        await product.save();
        return product;
    } catch (error) {
        console.log("Error in addReviewToProductRepository: ", error);
        throw new Error("Could not add review to product due to ", error);
    }
}

export const searchProductsRepository = async (searchQuery, sort, skip, limit) => {
    try {
        const products = await Product.find(searchQuery)
            .populate('category')
            .populate('subCategory')
            .populate('review')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();
        
        // Calculate ratings and discounts for search results
        const productsWithCalculations = products.map(product => {
            const reviews = product.review || [];
            let calculatedRating = 0;
            let reviewCount = reviews.length;
            
            if (reviewCount > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
                calculatedRating = Math.round((totalRating / reviewCount) * 10) / 10;
            }
            
            // Calculate discount percentage
            const mainPrice = product.mainPrice || 0;
            const discountAmount = product.discountAmount || 0;
            let discountPercentage = 0;
            
            if (mainPrice > 0 && discountAmount > 0) {
                discountPercentage = Math.round((discountAmount / mainPrice) * 100);
            }
            
            // Calculate relevance score (simplified)
            const relevanceScore = calculateRelevanceScore(product, searchQuery);
            
            return {
                ...product,
                calculatedRating,
                reviewCount,
                discountPercentage,
                savings: mainPrice - (product.finalPrice || mainPrice),
                relevanceScore
            };
        });

        // If sorting by rating, sort the calculated results
        if (sort.averageRating) {
            productsWithCalculations.sort((a, b) => b.calculatedRating - a.calculatedRating);
        }
        
        return productsWithCalculations;
    } catch (error) {
        console.log("Error in searchProductsRepository: ", error);
        throw new Error("Could not fetch search results: " + error.message);
    }
};

// Helper function to calculate relevance score
const calculateRelevanceScore = (product, searchQuery) => {
    let score = 0;
    const queryLower = searchQuery.$or[0].title.$regex.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const queryWords = queryLower.split(' ').filter(word => word.length > 0);
    
    // Check title matches
    const titleLower = product.title?.toLowerCase() || '';
    queryWords.forEach(word => {
        if (titleLower.includes(word)) {
            score += 10; // High weight for title matches
        }
    });
    
    // Check subtitle matches
    const subtitleLower = product.subTitle?.toLowerCase() || '';
    queryWords.forEach(word => {
        if (subtitleLower.includes(word)) {
            score += 5; // Medium weight for subtitle matches
        }
    });
    
    // Check key features
    const keyFeatures = product.keyFeatures?.join(' ').toLowerCase() || '';
    queryWords.forEach(word => {
        if (keyFeatures.includes(word)) {
            score += 3; // Lower weight for key features
        }
    });
    
    // Check tags
    const tags = product.tags?.join(' ').toLowerCase() || '';
    queryWords.forEach(word => {
        if (tags.includes(word)) {
            score += 2; // Low weight for tags
        }
    });
    
    return score;
};