var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET item list

router.get("/", function(req, res, next) {
  db("SELECT * FROM articles")
    .then(results => {
      res.send(results.data[0]);
    })
    .catch(err => res.status(500).send(err));
});

//GET one specific item

router.get("/:id", function(req, res, next) {
  let id = req.params.id;
  db(`SELECT * FROM articles where id= ${id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new item into the DB

router.post("/", function(req, res, next) {
  const {
    name,
    price,
    picture,
    description,
    colorId,
    inventory,
    categoryId
  } = req.body;

  db(
    `INSERT INTO articles (name, price, picture, description, colorId, inventory, categoryId)  VALUES ("${name}", "${price}", "${picture}", "${description}", "${colorId}", "${inventory}", "${categoryId}") `
  )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
