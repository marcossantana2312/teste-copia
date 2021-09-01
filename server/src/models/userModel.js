import mongoose, { Schema } from 'mongoose';
import { v4 as uuidV4 } from "uuid";

const userSchema = new Schema({
  email : { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true,}
})


const User = mongoose.model ('User', userSchema);

export default User;