const fs = require("fs").promises;

class CartManager {
    static ultId = 0;

    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    async addCart() {
        const newCart = {
            products: [],
        };

        if (arrayCarts.length > 0) {
            CartManager.ultId = arrayCarts.reduce(
            (maxId, cart) => Math.max(maxId, cart.id),
            0
            );
        }

        newCart.id = ++CartManager.ultId;

        arrayCarts.push(newCart);
        await this.guardarCarrito(arrayCarts);
        } catch (error) {
        console.log("Error al agregar carrito", error);
        throw error;
        }

    async getCartById(id) {
        try {
        const arrayCarts = await this.leerArchivo();
        const buscado = arrayCarts.find((item) => item.id === id);

        if (!buscado) {
            console.log("Carrito no encontrado");
            return null;
        } else {
            console.log("Carrito encontrado");
            return buscado;
        }
        } catch (error) {
        console.log("Error al leer el carrito", error);
        throw error;
        }
    }

    async addProductToCart() {
        const newProduct = {
            id,
            quantity
        };

        arrayCarrito.push(newProduct);
        await this.guardarProducto(arrayCarrito);
        } catch (error) {
        console.log("Error al agregar producto en carrito", error);
        throw error;
        }


    async leerArchivo() {
        try {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
        } catch (error) {
        console.log("Error al leer un archivo", error);
        throw error;    
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
        console.log("Error al guardar el archivo", error);
        throw error;
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
        const arrayProductos = await this.leerArchivo();

        const index = arrayProductos.findIndex((item) => item.id === id);

        if (index !== -1) {
            arrayProductos[index] = {
            ...arrayProductos[index],
            ...productoActualizado,
            };
            await this.guardarArchivo(arrayProductos);
            console.log("Producto actualizado");
        } else {
            console.log("No se encontró el producto");
        }
        } catch (error) {
        console.log("Error al actualizar el producto", error);
        throw error;
        }
    }

}

module.exports = CartManager;