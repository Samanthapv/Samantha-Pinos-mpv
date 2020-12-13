var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

//get orders by a certain user

router.get("/:userId", function(req, res, next) {
  const { userId } = req.params;
  console.log(userId);
  db(
    `SELECT * FROM Orders INNER JOIN OrderDetails ON Orders.id = OrderDetails.orderId INNER JOIN Articles ON OrderDetails.ArticleId = Articles.id WHERE userId= ${userId} ORDER BY Orders.id;`
  )
    .then(results => {
      const groupBy = key => array =>
        array.reduce(
          (objectsByKeyValue, obj) => ({
            ...objectsByKeyValue,
            [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
          }),
          {}
        );

      const groupByOrder = groupBy("orderId");

      let result = JSON.stringify(
        {
          itemsByOrder: groupByOrder(results.data)
        },
        null,
        2
      );

      //res.send(results.data);
      res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

//create new Order

router.post("/", function(req, res, next) {
  const { userId } = req.body;
  console.log(userId);
  db(`INSERT INTO Orders (userId) VALUES
      ("${userId}");`).then(results => {
    console
      .log("new order was created")
      .catch(err => res.status(500).send(err));
  });
});

//add item to last order made by user

router.post("/item", function(req, res, next) {
  const { userId, ArticleId } = req.body;
  console.log(userId, ArticleId);

  db(
    `SELECT * FROM Orders where userId = ${userId} ORDER BY id DESC LIMIT 0, 1;`
  ).then(results => {
    res.send(results);
    let id = results.data[0];
    console.log(id.id);
    db(`INSERT INTO OrderDetails (orderId, ArticleId) VALUES
      ("${id.id}", "${ArticleId}");`)
      .then(results => {
        console.log("item inserted").catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
  });
});

module.exports = router;
