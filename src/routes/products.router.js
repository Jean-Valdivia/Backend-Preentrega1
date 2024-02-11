const express = require("express");
const router = express.Router();

const ProductManager = require ("../controllers/ProductManager.js");
const productManager = new ProductManager ("./src/models/products.json");

//Products
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0,limit));
        } else {
            res.json(productos)
        }
    } catch (error) { 
        console.log("error al obtener los productos", error);
        res.status(500).json({error: "error del servidor"});
    }
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            res.json({
                error: "Producto no encontrado"
            })
        } else{
            res.json(producto);
        }
    } catch (error) {
        console.log("error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"});
    }
});

router.post("/", async (req, res) => {
    const nuevoProducto = req.body; 
    console.log(nuevoProducto);

    try {
        await productManager.addProduct(nuevoProducto),
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        console.log("error al agregar un producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

router.put("/:pid", async (req, res) => {
    let id = req.params.pid; 
    const productoActualizado = req.body; 

    try {
        await productManager.updateProduct(parseInt(id), productoActualizado);
        res.json({message: "Producto actualizado correctamente"});
    } catch (error) {
        console.log("No pudimos actualizar", error); 
        res.status(500).json({error: "Error del server"});
    }
} )

router.delete("/:pid", async (req, res) => {
    let id = req.params.pid; 
    const productoBorrado = req.body; 

    try {
        await productManager.deleteProduct(parseInt(id), productoBorrado);
        res.json({message: "Producto borrado correctamente"});
    } catch (error) {
        console.log("No pudimos borrar", error); 
        res.status(500).json({error: "Error del server"});
    }
} );

module.exports = router