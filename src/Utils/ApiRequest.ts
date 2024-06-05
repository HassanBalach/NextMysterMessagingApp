import { Messages } from "@/mongosse-model-schema/User.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptedMessage?: boolean;
    messages?: Array<Messages>
}