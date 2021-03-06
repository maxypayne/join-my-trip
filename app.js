require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const index = require("./routes/index");
const authRoutes = require("./routes/auth-routes");
const trip = require("./routes/trip");
const about = require("./routes/about");
const profilesController = require("./routes/profilesController");
mongoose.connect(
  "mongodb://heroku_0953v3hj:bnqh043imf9g0mc6tql4auv4um@ds237808.mlab.com:37808/heroku_0953v3hj"
);

// view engine setup
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "basic-auth-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // res.locals.isUserLoggedin = req.user != undefined
  console.log(req.session.currentUser);
  res.locals.isUserLoggedinn = req.session.currentUser ? true : false;

  next();
});

app.use("/", authRoutes);
app.use("/", index);
app.use("/", trip);
app.use("/", about);
app.use("/profiles", profilesController);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
