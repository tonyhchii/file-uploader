const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const poolInstance = require("../db/pool");

const verifyCallBack = async (username, password, done) => {
  try {
    const user = poolInstance.User.findFirst({
      where: { username: username },
    });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallBack);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(strategy);
