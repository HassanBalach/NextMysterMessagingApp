import {z} from "zod"

export const OTPvarificationSchema = z.string().length(6 , {message: "OPT code should be 6 digits"})
