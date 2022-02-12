const express = require("express");
const router = express.Router();

const Container = require("../Container/Contenedor");
const container = new Container();

const {
    updateProduct,
  } = require("../Container/Contenedor");


//Gets
router.get("/", (req, res) => {
    console.log(req.query);
    const status = req.query;
    
    container.getAll().then((result) => {
        if (result.status === "success") {
            res.status(200).send(result.payload);
        } else {
            res.status(500).send(result.message);
        }
    });
});

router.get("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    container.getById(id).then((result) => {
        console.log(result);
        res.send(result);
    });
});

//Post
router.post("/", (req, res) => {
    let body = req.body;
    body.price = parseInt(body.price);
    container.save(body).then((result) => {
        res.send(result);
    });
});
router.put("/:pid", updateProduct);


//Delete
router.delete("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    container.deleteById(id).then((result) => {
        res.send(result);
    });
});

module.exports = router;