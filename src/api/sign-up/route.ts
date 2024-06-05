import dbConnection from "@/lib/Database";
import UserModel from "@/mongosse-model-schema/User.model";
import bcrypt from "bcryptjs";
import { sendVarificationEmail } from "@/Helper/Send_Verification_Email";

export async function POST(request: Request) {
  await dbConnection();

  try {
    const { username, email, password } = await request.json();

    const existingVarifiedUserByName = await UserModel.findOne({
      username,
      isvarify: true,
    });
    if (existingVarifiedUserByName) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    const exitingUserByEmail = await UserModel.findOne({ email });
    const varifyCode = Math.floor(100000 + Math.random() * 300000).toString();

    if (exitingUserByEmail) {
      if (exitingUserByEmail.isvarify) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        exitingUserByEmail.varifyCode = varifyCode;
        exitingUserByEmail.varifyCodeExpiry = new Date(Date.now() + 3600000);
        exitingUserByEmail.password = hashedPassword;
        await exitingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isMessageAccepted: true,
        isvarify: false,
        varifyCode,
        varifyCodeExpiry: expiryDate,
        messages: [],
      });

      await newUser.save();

      // email verification

      const verificationEmail = await sendVarificationEmail(
        username,
        email,
        varifyCode
      );
      console.log("Verification Email", verificationEmail);

      if (!verificationEmail.success) {
        return Response.json(
          {
            success: false,
            message: verificationEmail.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify your account.",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
