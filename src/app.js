const express = require("express");
const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productsRouter = require ("./routes/products.router.js");
const cartsRouter = require ("./routes/carts.router.js");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter)

app.listen(PUERTO);