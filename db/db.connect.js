const mongoose = require("mongoose");

require("dotenv").config();

const mongoMetaData = process.env.MONGODB_URI;

const UserDataToMongo = async ()=>{
await mongoose.connect(mongoMetaData).then(()=>{console.log("Connected to Database.");}).catch((error)=>console.log("Error Connecting to Database.", error));
};

module.exports = {UserDataToMongo};