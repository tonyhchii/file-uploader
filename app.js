const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "views");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/loginRouter");
const passport = require("passport");
const fileUploadRouter = require("./routes/fileUploadRouter");
const createFolderRouter = require("./routes/createFolderRouter");
const poolInstance = require("./db/pool");

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(assetsPath));
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

app.use(async (req, res, next) => {
  res.locals.user = req.user;
  const folders = await poolInstance.folder.findMany({
    where: { userId: req.user.id },
  });
  res.locals.folders = folders;
  next();
});

app.use("/log-in", logInRouter);

app.use("/sign-up", signUpRouter);

app.use("/upload", fileUploadRouter);

app.use("/create", createFolderRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000);
