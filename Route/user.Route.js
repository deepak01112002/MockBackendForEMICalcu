
const express = require("express")
const bcrypt = require("bcrypt")
const UserModal = require("../Model/user.model")
const jwt = require("jsonwebtoken")
const auth = require("../Middleware/auth.middleware")
const UserRoute = express.Router()

UserRoute.get("/",(req,res)=>{
    res.send("Hello")
})

UserRoute.post("/register",(req,res)=>{
    const {password} = req.body
    try {
     bcrypt.hash(password,5, async (err,hash)=>{
        const data = new UserModal({...req.body,password:hash})
        await data.save()
        res.send({"msg":"User is Added"})
     })   
    } catch (error) {
        res.send({"msg" : error})
    }
})

UserRoute.post("/login",async (req,res)=>{
   const {email,password} = req.body
   try {
     let data = await UserModal.find({email:email})
    if(data.length>0){
      bcrypt.compare(password,data[0].password,(err,result)=>{
        if(result){
          var token = jwt.sign({authorID : data[0]._id,authorName : data[0].name}, "deepakpandey")
          res.send({"msg" : "Login Succesfull", "token" : token})
        }else{
            res.status(400).send({"msg" : "Login Unsuccessfull"})
        }
      })
    }
   } catch (error) {
      res.send({"msg" : error})
   } 
})


UserRoute.get("/profile",auth, async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
      var decode = jwt.verify(token,"deepakpandey")
      let data = await UserModal.find({_id:decode.authorID})
      res.send({"msg" : "User Profile Found", "profile" : data})
    }
})

UserRoute.get("/calculate",auth,(req,res)=>{
    const{loan,interest,time} = req.body
    try {
        if(loan&&interest&&time){
            let r = ((interest/12)/100).toFixed(6)
            let E = (((loan * r) * (( 1 + r) * time)) / (((1+r)*time)-1)).toFixed(1)
            res.status(200).send({"EMI" : E ,"time" : time, "total" : loan+E, "interest" : (loan+E)-loan })
        }
    } catch (error) {
        res.send({"msg" : error})
    }
})


UserRoute.get("/logout",auth,(req,res)=>{
    try {
        res.send({"msg" : "Logout Successfully"})
    } catch (error) {
        res.send({"msg" : error})
    }
})

module.exports = UserRoute