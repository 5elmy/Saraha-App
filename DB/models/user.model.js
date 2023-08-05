import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline", "blocked"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      lowercase:true
    },
    age:Number
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
