import { addGroupRepository, addProductToGroupRepository, getGroupByGroupIdRepository, removeProductFromGroupRepository } from "../repositories/groupRepository.js";
import { addProductRepository, addReviewToProductRepository, deleteProductRepository, getAllProductsRepository, getProductByIdRepository, getProductByProducIdRepository, getProductsBySubcategoryRepository, searchProductsRepository, updateProductRepository } from "../repositories/productRepository.js";
import Product from "../schemas/productSchema.js";

//Service functions for Product model

//Function to add a new product

export const addProductService = async (productData) => {
    try {
        const product = await addProductRepository(productData);

        return product;
    } catch (error) {
        console.log("Error in addProductService: ", error);
        throw new Error("Could not add product from service due to ", error);
    }
}

//Function to delete a product by ID

export const deleteProductService = async (productId) => {
    try {
        const deletedProduct = await deleteProductRepository(productId);
        const group = await getGroupByGroupIdRepository(deletedProduct.groupId);

        if(group){
            await removeProductFromGroupRepository(deletedProduct.groupId, deletedProduct._id);
        }
        
        return deletedProduct;
    } catch (error) {
        console.log("Error in deleteProductService: ", error);
        throw new Error("Could not delete product from service due to ", error);
    }
}

//Function to update a product by ID

export const updateProductService = async (productId, updatedData) => {
    try {
        const updatedProduct = await updateProductRepository(productId, updatedData);
        return updatedProduct;
    } catch (error) {   
        console.log("Error in updateProductService: ", error);
        throw new Error("Could not update product from service due to ", error);
    }
}

//Function to get all products

export const getAllProductsService = async (
    page = 1, 
    limit = 12, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    search = ''
) => {
    try {
        // Calculate pagination
        const skip = (page - 1) * limit;
        
        // Build sort object
        let sort = {};
        switch(sortBy) {
            case 'title':
                sort = { title: sortOrder === 'asc' ? 1 : -1 };
                break;
            case 'stockQuantity':
                sort = { stockQuantity: sortOrder === 'asc' ? 1 : -1 };
                break;
            case 'finalPrice':
                sort = { finalPrice: sortOrder === 'asc' ? 1 : -1 };
                break;
            case 'featured':
                sort = { createdAt: -1, stockQuantity: -1 }; // Example featured sort
                break;
            default:
                sort = { createdAt: sortOrder === 'asc' ? 1 : -1 };
        }

        // Get products from repository
        const result = await getAllProductsRepository(sort, skip, limit, search);

        // Calculate additional statistics
        const allProducts = await getAllProductsRepository({}, 0, 10000, search);
        const stats = {
            totalValue: allProducts.products.reduce((sum, p) => sum + (p.stockQuantity * p.finalPrice), 0),
            lowStockProducts: allProducts.products.filter(p => p.stockQuantity < 10 && p.stockQuantity > 0).length,
            outOfStockProducts: allProducts.products.filter(p => p.stockQuantity === 0).length,
            averagePrice: allProducts.products.reduce((sum, p) => sum + p.finalPrice, 0) / allProducts.products.length || 0
        };

        return {
            ...result,
            stats,
            limit,
            sortBy,
            sortOrder
        };
    } catch (error) {
        console.log("Error in getAllProductsService: ", error);
        throw new Error("Could not fetch products: " + error.message);
    }
};

//Function to get a product by ID

export const getProductByIdService = async (productId) => {
    try {
        const product = await getProductByIdRepository(productId);
        return product;
    } catch (error) {
        console.log("Error in getProductByIdService: ", error);
        throw new Error("Could not fetch product from service due to ", error);
    }
}

export const getProductByProductIdService = async (productId) => {
    try {
        const product = await getProductByProducIdRepository(productId);
        return product;
    } catch (error) {
        console.log("Error in getProductByProductIdService: ", error);
        throw new Error("Could not fetch product from service due to ", error);
    }
}

export const getProductsBySubcategoryService = async (subCategoryId, filters, page) => {
    try {
        const products = await getProductsBySubcategoryRepository(subCategoryId, filters, page);
        return products;
    } catch (error) {
        console.log("Error in getProductsBySubcategoryService: ", error);
        throw new Error("Could not fetch products from service due to " + error);
    }
}

export const addReviewToProductService = async (productId, reviewData) => {
    try {
        const product = await addReviewToProductRepository(productId, reviewData);
        return product;
    } catch (error) {
        console.log("Error in addReviewToProductService: ", error);
        throw new Error("Could not add review to product from service due to " + error);
    }
}

export const searchProductsService = async (query = "", page = 1, limit = 10, sortBy = 'relevance') => {
    try {
        const skip = (page - 1) * limit;

        if (!query || query.length < 2) {
            return {
                products: [],
                totalCount: 0,
                totalPages: 0
            };
        }

        // Build search query using MongoDB text search or regex
        const searchQuery = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { subTitle: { $regex: query, $options: 'i' } },
                { 'keyFeatures': { $regex: query, $options: 'i' } },
                { 'tags': { $regex: query, $options: 'i' } },
                { 'description.descriptionText': { $regex: query, $options: 'i' } }
            ]
        };

        // Build sort object
        let sort = {};
        switch (sortBy) {
            case 'newest':
                sort = { createdAt: -1 };
                break;
            case 'price-low':
                sort = { finalPrice: 1 };
                break;
            case 'price-high':
                sort = { finalPrice: -1 };
                break;
            case 'rating-high':
                // Will handle rating in repository
                sort = { createdAt: -1 };
                break;
            default: // 'relevance'
                // For relevance, we could use text score if text index is enabled
                // For now, sort by title match first
                sort = { createdAt: -1 };
                break;
        }

        // Get total count
        const totalCount = await Product.countDocuments(searchQuery);

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

        // Get paginated search results
        const products = await searchProductsRepository(searchQuery, sort, skip, limit);

        return {
            products,
            totalCount,
            totalPages
        };
    } catch (error) {
        console.log("Error in searchProductsService: ", error);
        throw new Error("Could not perform search: " + error.message);
    }
};