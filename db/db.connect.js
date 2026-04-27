const mongoose = require("mongoose");

require("dotenv").config();

const mongoMetaData = process.env.MONGODB_URI;

let cachedDb = null;

const UserDataToMongo = async()=> {
  if (cachedDb) return cachedDb;
await mongoose.connect(mongoMetaData).then(()=>{console.log("Connected to Database.");}).catch((error)=>console.log("Error Connecting to Database.", error));

  return cachedDb;
}
module.exports = {UserDataToMongo};