import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  phoneNumber: { type: String, default: '' },
  photoURL: { type: String, default: '' },
  role: { type: String, default: "user" }, 
});

const User = mongoose.model("User", UserSchema);
export default User;
