import { addProductService, addReviewToProductService, deleteProductService, getAllProductsService, getProductByIdService, getProductByProductIdService, getProductsBySubcategoryService, searchProductsService, updateProductService } from "../services/productService.js";

//Controller functions for Product model

//Controller function to add a new product

export const addProductController = async (req, res) => {
    try {
        const productData = req.body;
        const image = req.file ? req.file.location : null;

        if(image){
            productData.image = image;
        }

        const newProduct = await addProductService(productData);

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        });
    } catch (error) {
        console.log("Error in addProductController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not add product from controller",
            error: error.message,
        });
    }
};


//Controller function to delete a product by ID

export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const deletedProduct = await deleteProductService(productId);

        if(!deletedProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (error) {
        console.log("Error in deleteProductController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete product from controller",
            error: error.message
        });
    }
}

//Controller function to update a product by ID

export const updateProductController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const updatedData = req.body;
        const image = req.file ? req.file.location : null;

        if(image){
            updatedData.image = image;
        }

        console.log("Product ID to update: ", productId);
        console.log("Updated data received in controller: ", updatedData);
        const updatedProduct = await updateProductService(productId, updatedData);

        if(!updatedProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.log("Error in updateProductController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not update product from controller",
            error: error.message
        });
    }
}

//Controller function to get all products

export const getAllProductsController = async (req, res) => {
    try {
        // Extract query parameters with defaults
        const {
            page = 1,
            limit = 12,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            search = '',
            filterStatus = 'all'
        } = req.query;

        // Validate parameters
        const validatedPage = Math.max(1, parseInt(page));
        const validatedLimit = Math.min(100, Math.max(1, parseInt(limit)));
        const validatedSortOrder = ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc';
        
        // Build additional filters based on status
        let additionalSearch = search;
        if (filterStatus === 'inStock') {
            additionalSearch += ' stock:>0';
        } else if (filterStatus === 'lowStock') {
            additionalSearch += ' stock:>0 stock:<10';
        } else if (filterStatus === 'outOfStock') {
            additionalSearch += ' stock:0';
        }

        // Get products from service
        const result = await getAllProductsService(
            validatedPage,
            validatedLimit,
            sortBy,
            validatedSortOrder,
            additionalSearch
        );

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: result
        });
    } catch (error) {
        console.log("Error in getAllProductsController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch products",
            error: error.message
        });
    }
};

//Controller function to get a product by ID

export const getProductByIdController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const product = await getProductByIdService(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        console.log("Error in getProductByIdController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch product from controller",
            error: error.message
        });
    }
}

export const getProductByProductIdController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const product = await getProductByProductIdService(productId);

        if(!product || product.length === 0){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        console.log("Error in getProductByProductIdController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch product from controller",
            error: error.message
        });
    }
}

export const getProductsBySubcategoryController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
        const page = parseInt(req.query.page) || 1;

        console.log("Filters received in controller: ", filters);

        const products = await getProductsBySubcategoryService(subCategoryId, filters, page);

        if(!products || products.length === 0){
            return res.status(404).json({
                success: false,
                message: "No products found for the given subcategory and filters",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.log("Error in getProductsBySubcategoryController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch products from controller",
            error: error.message
        });
    }
}

export const addReviewToProductController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const reviewData = req.body;
        const updatedProduct = await addReviewToProductService(productId, reviewData);

        if(!updatedProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.log("Error in addReviewToProductController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not add review from controller",
            error: error.message
        });
    }
}

export const searchProductsController = async (req, res) => {
    try {
        const {
            q = "",
            page = 1,
            limit = 10,
            sortBy = 'relevance'
        } = req.query;

        // Convert page and limit to numbers
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        // Get search results
        const result = await searchProductsService(q.trim(), pageNum, limitNum, sortBy);

        if(!result || result.products.length === 0){
            return res.status(200).json({
                success: true,
                message: "No products found",
                data: {
                    products: [],
                    totalCount: 0,
                    totalPages: 0,
                    currentPage: pageNum,
                    itemsPerPage: limitNum
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            data: {
                products: result.products,
                totalCount: result.totalCount,
                totalPages: result.totalPages,
                currentPage: pageNum,
                itemsPerPage: limitNum
            }
        });
    } catch (error) {
        console.log("Error in searchProductsController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not perform search",
            error: error.message
        });
    }
};