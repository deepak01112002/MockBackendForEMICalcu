const express = require("express")
const connection  = require("./db")
const UserRoute = require("./Route/user.Route")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/user",UserRoute)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connection Done")
    } catch (error) {
        console.log("connection failed")
    }
})