const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://deepak:pandey@cluster0.w9fe5jz.mongodb.net/MockMongo?retryWrites=true&w=majority")


module.exports = connection