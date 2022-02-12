//Import express
const express = require("express");

//Import cors/multer
const cors = require("cors");
const multer = require("multer");

//Initial
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Se escucha en: " + PORT);
});

//Import container
const Container = require("./Container/Contenedor");

const container = new Container();

//Import router
const routerProducts = require("./router/productos");


//Configuration products json
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Middleware err
app.use((err, req, res, next) => {
    console.log(err.stack);
    escape.status(500).send("Err in the server");
});

app.use((req, res, next) => {
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log("Hice la prueba a las: " + time.toTimeString().split(" ")[0]);
    next();
});

app.get("/", (req, res) => {
    res.send(`<h1> Hola, estoy probando\n <ul> <li>GET. '/api/productos'\n</li> <li>GET. '/api/products/:id'\n</li> <li>POST. '/api/products'\n
    <li>PUT. '/api/products/:id'\n</li><li>DELETE. '/api/products/:id'\n</li><li>FORMULARIO. '/index.html'\n <a href="./forms.html">Ingrese al Form<a/></li></ul></h1>`);
});

//Middleware
app.use("/api/products", routerProducts);

// //Get random product
app.get("/api/productoRandom", (req, res) => {
    try {
    container.getProductoRandom().then((result) => {
        let products = result.payload;
        console.log(products);
        if (result.status === "success") {
            console.log("RESULT", result);
            res.send(result.payload);
        } else {
            res.send(res.message);
        }
    });
    } catch (error) {
        res.send(res.message);
    }
});