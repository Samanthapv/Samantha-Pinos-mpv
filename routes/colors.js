var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

router.get("/colors", function(req, res, next) {
  db("SELECT * FROM Colors")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
