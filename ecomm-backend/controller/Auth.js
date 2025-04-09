const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword,salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) =>{
          if(err){
            res.status(400).json(err);
          }
          else{
            res.status(201).json(sanitizeUser(doc));
          }
        });
       
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.loginUser = async (req, res) => {
//   try {
//        const user = await User.findOne({email:req.body.email},).exec();
//     //    this is just temporary , we will use strong password auth
//     console.log({user})
//     if(!user){
//         res.status(401).json({message:'no such user email'});
//     }
//     else if(user.password === req.body.password){
//         res.status(200).json({id:user.id, role:user.role})
//     }
//    else{
//     res.status(401).json({message:'invalid credentails'});
//    }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
exports.loginUser = async (req, res) => {
  // ****Passport JS**********
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  // ****Passport JS**********
  res.json(req.user);
};
