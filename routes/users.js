var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var bcrypt = require("bcrypt");
const saltRounds = 10;

// GET one user
router.get("/:id", userShouldBeLoggedIn, function(req, res, next) {
  let id = req.params.id;
  db(`SELECT * FROM users WHERE id = ${id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new user into the DB
router.post("/", async (req, res) => {
  const { username, password, email, name, address } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  db(`INSERT INTO users (username, name, password, email, address) VALUES
     ("${username}", "${name}", "${hash}", "${email}", "${address}");`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET all users
router.get("/", function(req, res, next) {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//UPDATE ADDRESS

router.put("/", (req, res) => {
  const { userId, address } = req.body;

  db(`UPDATE Users SET address = "${address}" WHERE id = ${userId}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
