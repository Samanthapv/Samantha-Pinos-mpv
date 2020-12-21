var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET item list

router.get("/", function(req, res, next) {
  var sql = "SELECT * from articles WHERE";

  const color = req.query.color;
  const category = req.query.category;

  if (color && category) {
    sql += ` colorID = ${color} and categoryId = ${category};`;
  } else if (color) {
    sql += ` colorID = ${color};`;
  } else if (category) {
    sql += ` categoryID = ${category};`;
  } else {
    sql += 1;
  }

  db(sql)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get items price descending

router.get("/price/down", function(req, res, next) {
  db(`SELECT * From articles ORDER BY price DESC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get items price ascending

router.get("/price/up", function(req, res, next) {
  db(`SELECT * From articles ORDER BY price ASC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//search items by tag

router.get("/search/:search", function(req, res, next) {
  let search = req.params.search;
  db(`SELECT * FROM articles WHERE tags LIKE "%${search}%";`)
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

// INSERT a new item into the DB (won't be used in the frontend, added to add items in Postman)

router.post("/", function(req, res, next) {
  const {
    name,
    price,
    picture,
    description,
    colorId,
    inventory,
    categoryId,
    tags
  } = req.body;

  db(
    `INSERT INTO articles (name, price, picture, description, colorId, inventory, categoryId)  VALUES ("${name}", "${price}", "${picture}", "${description}", "${colorId}", "${inventory}", "${categoryId}", "${tags}") `
  )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
