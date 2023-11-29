const { Router } = require('express')
const ProductManagerFile = require ('../managers/productsManagerFile')

const router = Router()
const productService = new  ProductManagerFile()

router
    .get('/', async (req,res)=>{
        const products = await productService.getProducts()
        res.send({
            status: 'succes',
            payload: products
        })
    })

    .get('/:pid', async (req,res)=>{
        const {pid} = req.params
        const product = await productService.getProduct(pid)
        if (!product) {
            return res.status(400).send({
                status: 'error',
                payload: 'No se encuentra el producto'
            })
        }
        res.send({
            status: 'succes',
            payload: product
        })
    })

    .post('/', (req, res) => {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        productManager.addProduct(title, description, price, thumbnail, code, stock, status, category);
        res.json({ message: 'Producto agregado con éxito.' });
    })

    .put('/:id', (req, res) => {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID no válido.' });
        }
        const updatedProductData = req.body;
        productManager.updateProduct(productId, updatedProductData);
        res.json({ message: `Producto con ID ${productId} actualizado con éxito.` });
    })

    .delete('/:id', (req, res) => {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID no válido.' });
        }
        res.json(productManager.deleteProduct(productId));

    })

module.exports = router