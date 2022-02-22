const express = require("express");
const Contenedor = require("./class/container");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Contenedor(__dirname + "/data/products.json");

app.set('views', './views/pug')
app.set('views engine', 'pug')

app.get('/', (req, res) => {
    let content = productos.content
    return res.render('index.pug', {content})
})

app.post("/products", (req, res) => {
    productos.save(req.body)
    let content = productos.content
    return res.render('products.pug', {content});
});

app.get("/products", (req, res) => {
    let content = productos.content
    return res.render('products.pug', {content});
});

app.listen(8080);