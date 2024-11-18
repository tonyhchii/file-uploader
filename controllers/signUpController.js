const bcrypt = require("bcryptjs");
const poolInstance = require("../db/pool");

const loadPage = (req, res) => res.render("sign-up-form");

const { body, validationResult } = require("express-validator");

const validateForm = [
  body("username")
    .isLength({ max: 20, min: 4 })
    .withMessage("Username needs to be within 4-20 characters")
    .isAlphanumeric()
    .withMessage("Username needs to be alphanumeric")
    .custom(async (value) => {
      const user = await poolInstance.accounts.findFirst({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .isLength({ min: 4, max: 24 })
    .withMessage("Password needs to be within 4-24 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

const signUpUser = [
  validateForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // add database entry here
        await poolInstance.accounts.create({
          data: {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
          },
        });
      });
      res.redirect("/");
    } else {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      });
    }
  },
];

module.exports = { loadPage, signUpUser };
