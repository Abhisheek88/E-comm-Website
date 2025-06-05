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
const path = require('path');
require('dotenv').config();



const SECRET_KEY = "SECRET_KEY";

//JWT Option

const opts = {};
opts.jwtFromRequest =cookieExtractor;
opts.secretOrKey = "SECRET_KEY";  



server.use(
  cors()
);




// Serve static files from the React build
server.use(express.static(path.join(__dirname, 'build')));




server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // cookie:{secure:false, maxAge:60000}  //destroy in 60 sec
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
          done(null,{ id:user.id, role:user.role,token:token});
          // 
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





//Payments


// This is your test secret API key.
const stripe = require("stripe")(process.env.SECRET_KEY);


const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
 
  return 1200;
};

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount,orderId } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount),
   
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



// Fallback for ALL frontend routes (important for React Router)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});






mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB "))
  .catch((err) => console.error("MongoDB Connection Error:", err));
  

server.listen(8080, () => {
  console.log(" Server Started on Port 8080");
});
