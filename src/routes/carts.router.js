const express = require("express");
const router = express.Router();

const CartManager = require ("../controllers/cartManager.js");
const cartManager = new CartManager("./src/carts.json")

//Cart
router.post("/", async (req, res) => {
    const nuevoCarrito = req; 
    console.log(nuevoCarrito);

    try {
        await cartManager.addCart(nuevoCarrito),
        res.status(201).json({message: "Carrito creado exitosamente"});
    } catch (error) {
        console.log("error al crear un carrito", error);
        res.status(500).json({error: "error del servidor"});
    }
})


router.get("/:cid", async (req, res) => {
    let id = req.params.cid;

    try {
        const carrito = await cartManager.getCartById(parseInt(id));
        if (!carrito) {
            res.json({
                error: "Carrito no encontrado"
            })
        } else{
            res.json(carrito);
        }
    } catch (error) {
        console.log("error al obtener el carrito", error);
        res.status(500).json({error: "Error del servidor"});
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = arrayCarts.find((item) => item.id === cid);
    if (!cart) {
        console.log("Carrito no encontrado al agregar producto");
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const product = await this.leerArchivo(pid);
    if (!product) {
        console.log("Producto no encontrado al agregar producto");
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    try {
        await cartManager.addProductToCart(cart, product);
        res.status(201).json({ message: "Producto agregado exitosamente" });
        if(product){
            quantity = quantity+1
        }
    } catch (error) {
        console.log("Error al agregar un producto", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router