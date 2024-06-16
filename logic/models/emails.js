import mongoose from "mongoose";
import mainMongooseInstance from "../database";

var ObjectId = mongoose.mongo.ObjectId;

const customEmailSchema = new Schema({
    generatedEmailID: String,
    customerEmail: String,
    advertiserEmail: String,
});

let CustomEmail = mainMongooseInstance.model("CustomEmail", customEmailSchema);

export default CustomEmail;