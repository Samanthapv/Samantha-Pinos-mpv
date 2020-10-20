var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET item list

router.get("/", function(req, res, next) {
  db("SELECT * FROM articles")
    .then(results => {
      res.send(results.data);
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

// filter items based on their category

router.get("/", function(req, res, next) {
  const { categoryId } = req.body;

  db(`SELECT * FROM articles WHERE categoryId = ${categoryId}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// filter items based on their color

router.get("/", function(req, res, next) {
  const { colorId } = req.body;

  db(`SELECT * FROM articles WHERE colorId = ${colorId}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// filter items based on their color and category

router.get("/", function(req, res, next) {
  const { colorId, categoryId } = req.body;

  db(
    `SELECT * FROM articles WHERE colorId = ${colorId} AND categoryId = ${categoryId}`
  )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new item into the DB (won't be used in the frontend, added to add items in Postman)

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

// DELETE item  (won't be used in the frontend)
router.delete("/:id", function(req, res, next) {
  let id = req.params.id;

  db(`DELETE FROM articles WHERE id = ${id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
