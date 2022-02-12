const fs = require("fs");

class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.products = [];
    }

    async save(product) {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            if (products.some((pro) => pro.title === product.title)) {
                return {
                    status: "error",
                    message: "Ya existe este producto"
                };
            } else {
                let dataObj = {
                    id: products.length + 1,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail
                };
                products = [...products, dataObj];

                try {
                    await fs.promises.writeFile(
                        "./Files/productos.txt",
                        JSON.stringify(products, null, 2)
                    );
                    return {
                        status: "success",
                        message: "Se guardó el producto"
                    };
                } catch (error) {
                    return {
                        status: "error",
                        message: "No se ha podido guardar el producto"
                    };
                }
            }
        } catch (error) { 
            //file productos.txt do not exist
            let dataObj = {
            id: 1,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
            };

            try {
                await fs.promises.writeFile(
                    "./Files/productos.txt",
                    JSON.stringify([dataObj], null, 2)
                );
                return {
                    status: "success",
                    message: "Se creo el producto con exito"
                };
            } catch (error) {
                return {
                    status: "error",
                    message: "No se creo el producto: " + error
                };
            }
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            let product = products.find((product) => product.id === id);
            if (products.length > 0) {
                if (product) {
                    return {
                        status: "successs",
                        payload: product
                    };
                } else {
                    return {
                        status: "error",
                        product: null,
                        message: "No se encuentra producto"
                    };
                }
            } else {
                return {
                    status: "error",
                    product: null,
                    message: "No se encuentra producto"
                };
            }
        } catch (error) {
            return {
                status: "error",
                message: "No se ha encontrado el producto" + error
            };
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            console.log(products);
            return {
                status: "success",
                message: "Se encontraron los productos",
                payload: products
            };
        } catch (error) {
            return {
                status: "error",
                message: "No se han encontrado los productos"
            };
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            let result = products.filter((product) => product.id !== id);
            products = result;

            await fs.promises.writeFile(
                "./Files/productos.txt",
                JSON.stringify(products, null, 2)
            );
            return {
                status: "success",
                message: "Ha eliminado un producto"
            };
        } catch (error) {
            return {
                status: "Error",
                message: "No se encontro el producto que quiere eliminar" + error
            };
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile("./Files/productos.txt", JSON.stringify([]));
            return {
                status: "success",
                message: "Se eliminaron los productos"
            };
        } catch (error) {
            return {
                status: "error",
                message: "No se eliminaron los productos"
            };
        }
    }

    async getProductoRandom() {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            let randomNumber = Math.floor(Math.random() * products.length);
            console.log("RANDOM", randomNumber);
            let randomProduct = products[randomNumber];
            return {
                status: "success",
                message: "Se encontró el producto",
                payload: randomProduct
            };
        } catch (error) {
            return {
                status: "error",
                message: "Producto inexistente " + error
            };
        }
    }


    async updateProduct(id, body) {
        try {
            let data = await fs.promises.readFile("./Files/productos.txt", "utf-8");
            let products = JSON.parse(data);
            if (!products.some((product) => product.id === id))
                return {
                    status: "error",
                    message: "Id no encontrado"
                };

            let result = products.map((product) => {
                if (product.id === id) {
                    body = Object.assign(body);
                    body = Object.assign({ id: product.id, ...body });
                    return body;
                } else {
                    return product;
                }
            });
            try {
                await fs.promises.writeFile("./Files/productos.txt", JSON.stringify(result, null, 2)
                );
                return { status: "success", message: "Se actualizó el producto" };
            } catch {
                return { status: "error", message: "No se ha podido actualizar el producto" };
            }
        } catch (error) {
            return { status: "error", message: "Error al actualizar el producto" }
        }
    }
}
module.exports = Container;