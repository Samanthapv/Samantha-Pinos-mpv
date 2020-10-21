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

router.get("/color/:color", function(req, res, next) {
  let color = req.params.color;
  db(`SELECT * FROM articles WHERE colorID = ${color}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//filter items
//what we need http://localhost:5000/items?color=3&category=9
//what we need 2 SELECT * FROM articles WHERE colorId = ${colorId} AND categoryId = ${categoryId}`

// router.get("/", function(req, res, next) {
//   var sql = "SELECT * from articles WHERE";

//   const color = req.query.color;
//   const category = req.query.category;

//   if (color && category) {
//     sql += ` colorID = ${color} and categoryId = ${category};`;
//   } else if (color) {
//     sql += ` colorID = ${color};`;
//   } else if (category) {
//     sql += ` categoryID = ${category};`;
//   }

//   db(sql)
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
// });

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
