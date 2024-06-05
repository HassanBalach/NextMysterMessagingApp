import { z } from "zod";




export const signInUser = z.object({
    
        email: z.string().email({message: "Invalid email address"}) ,
        password: z.string() 

      });