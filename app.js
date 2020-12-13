var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var itemsRouter = require("./routes/items");
var colorsRouter = require("./routes/colors");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var categoriesRouter = require("./routes/categories");
var checkoutRouter = require("./routes/server");
var ordersRouter = require("./routes/orders");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/items", itemsRouter);
app.use("/colors", colorsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/server", checkoutRouter);
app.use("/orders", ordersRouter);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: "Error" });
});

module.exports = app;
