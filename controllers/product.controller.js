import productServices from "../services/product.service.js"

// createProduct
const createProduct = async (req, res) => {
    try {
        const product = await productServices.createProduct(req.body);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// deleteProduct
const deleteProduct = async (req, res) => {

    const productId = req.params.id

    try {
        const product = await productServices.deleteProduct(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// updateProduct
const updateProduct = async (req, res) => {

    const productId = req.params.id

    try {
        const product = await productServices.updateProduct(productId, req.body);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// findProductById
const findProductById = async (req, res) => {

    const productId = req.params.id

    try {
        const product = await productServices.findProductById(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// findProductById
const getAllProducts = async (req, res) => {

    const productId = req.params.id

    try {
        const products = await productServices.getAllProducts(req.query);
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// findProductById
const createMultipleProducts = async (req, res) => {

    const productId = req.params.id

    try {
        const products = await productServices.createMultipleProducts(req.body);
        return res.status(201).send({message: "Products created successfully"})
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

export {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProducts
}