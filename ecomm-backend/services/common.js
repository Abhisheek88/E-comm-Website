const passport = require("passport");

exports.isAuth = (req, res, done) =>{
    return passport.authenticate('jwt');
  };

  exports.sanitizeUser =(user)=>{
    return {id:user.id, role:user.role}

  };

 exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // console.log(token)
    // token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmE4NDRlNDk5NDJmMWEzMGQ3ZGJiZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1MjA1OTMyfQ.SI5F6igJaoc4haYbkSIOqOeZu29rcDfb2tsB6dKMI2Y'
   
   //admin
  //  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmE4NGJiNDk5NDJmMWEzMGQ3ZGJiZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxMjg3NX0.yThfsLspbJfMKIPD_1qnlP0OuO5ybjGXRakBb_6G7vc"
    return token;
  };
  
  