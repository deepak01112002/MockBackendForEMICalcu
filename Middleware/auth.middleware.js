const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
      var decode = jwt.verify(token,"deepakpandey")
      if(decode){

        next()
      }else{
        res.send({"msg" : "Login Credential are wrong"})
      }
    }
}

module.exports = auth