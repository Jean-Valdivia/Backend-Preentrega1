const express = require("express");
const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({extended:true}));

const ProductManager = require ("../src/controllers/ProductManager.js");
const productManager = new ProductManager ("./src/models/products.json");

const CartManager = require ("../src/controllers/cartManager.js");
const cartManager = new CartManager("./src/carts.json")

app.use(express.json());

//Products
app.get("/api/products", async (req, res) => {
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

app.get("/api/products/:pid", async (req, res) => {
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

app.post("/api/products", async (req, res) => {
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

app.put("/api/products/:pid", async (req, res) => {
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

app.delete("/api/products/:pid", async (req, res) => {
    let id = req.params.pid; 
    const productoBorrado = req.body; 

    try {
        await productManager.deleteProduct(parseInt(id), productoBorrado);
        res.json({message: "Producto borrado correctamente"});
    } catch (error) {
        console.log("No pudimos borrar", error); 
        res.status(500).json({error: "Error del server"});
    }
} )

//Cart
app.post("/api/cart", async (req, res) => {
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


app.get("/api/cart/:cid", async (req, res) => {
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

app.post("/api/cart/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    
    cid = await this.leerArchivo();
    const buscado = arrayCarts.find((item) => item.id === id);

    if (!buscado) {
        console.log("Carrito no encontrado al agregar producto");
        return null;
    } else {
        console.log("Carrito encontrado");
        return buscado;
    };

    pid = await this.leerArchivo();
    try {
        await cartManager.addProductToCart(cid),
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        console.log("error al agregar un producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})


app.listen(PUERTO);