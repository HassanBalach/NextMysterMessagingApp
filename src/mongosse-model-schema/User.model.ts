import mongoose, { Schema, Document, mongo } from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



// Assuming Messages is defined somewhere else
export interface Messages extends Document {
  content: string;
  createdAt: Date;
}

export const messageSchema: Schema<Messages> = new mongoose.Schema({
    content :{
        type: String,
        required: true

    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})



export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isvarify: boolean;
    varifyCode: string;
    varifyCodeExpiry: Date;
    isMessageAccepted: boolean;
    messages: Messages[];
  }


export const userSchema: Schema<User> = new mongoose.Schema({
  username: { type: String, required: [ true , "Username is required"], trim: true , unique: true},
  email: { type: String, required: [ true , "email is required"], unique: true , match:[emailRegex, "Please add an valid email address"]},
  password: { type: String, required: [ true , "password is required"] },
  isvarify: { type: Boolean, default: false },
  varifyCode: { type: String  , required: [true, "VarifyToken is requir"]},
  varifyCodeExpiry: { type: Date },
  isMessageAccepted: { type: Boolean, default: true },
  messages: [messageSchema],
});

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema) ;


export default UserModel