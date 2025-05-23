const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser =require('cookie-parser');
const jwt = require("jsonwebtoken");
const productRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const session = require("express-session");
const passport = require("passport");
const { User } = require("./model/User");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");

const SECRET_KEY = "SECRET_KEY";

//JWT Option

const opts = {};
opts.jwtFromRequest =cookieExtractor;
opts.secretOrKey = "SECRET_KEY";  

//Middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.static('build'));

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(cookieParser());
server.use(passport.authenticate("session"));
server.use(express.json()); //to parse req.body : it help to get data in json format
server.use("/products", isAuth(), productRouter.router);
server.use("/brands", isAuth(),brandsRouter.router);
server.use("/categories", isAuth(),categoriesRouter.router);
server.use("/users", isAuth(),usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(),cartRouter.router);
server.use("/orders", isAuth(),orderRouter.router);

// Passport strategies  ***from Passport js*****
passport.use(
  "local",
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    // by default passport use username
    //for use email :username
    //copy code of Auth.js controller se LoginUser function ka fir LoginUser ka code bhi change hoga
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        //res.status(200).json chnage -->> done()
        done(null, false, { message: "invalid credentails" }); //for saftey sending same message
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "invalid credentails" });
          }

          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null,{ id:user.id, role:user.role});
          // ,token:token
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

//JWT ******************
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });

    try {
      const user = await User.findById(  jwt_payload.id   );
      if (user) {
        return done(null, sanitizeUser(user )); //this call serializer
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

//        ****From PassportJS****

// this create session variable req.user on being called
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this create session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

const MONGO_URI =
  "mongodb+srv://Abhisheek88:Abhi123@abhi.7hlfr.mongodb.net/ecomm";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB "))
  .catch((err) => console.error("MongoDB Connection Error:", err));
  

server.listen(8080, () => {
  console.log(" Server Started on Port 8080");
});
