import mongoose, { Schema } from "mongoose";
import mainMongooseInstance from "../database.js";

// var ObjectId = mongoose.mongo.ObjectId;

const customEmailSchema = new Schema({
  generatedEmailID: String,
  customerEmailID: String,
  advertiserEmailID: String,
});

let CustomEmail = mainMongooseInstance.model("CustomEmail", customEmailSchema);

export default CustomEmail;
