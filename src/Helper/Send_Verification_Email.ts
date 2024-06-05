import { resend } from "@/lib/Resend";
import VerificationEmail from "../../Emails/ValidationEmail";
import { ApiResponse } from "@/Utils/ApiRequest";

export async function sendVarificationEmail(
  username: string,
  email: string,
  varifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Mystery Messaging varification code:",
      react: VerificationEmail({ username, otp: varifyCode }),
    });

    return {
      success: true,
      message: "Successfully send the varification email",
    };
  } catch (error) {
    console.error("Fail to varify the email:", error);
    return { success: false, message: "Fail to send varification email" };
  }
}
