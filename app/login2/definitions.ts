import {z} from "zod"

export const SignupFormSchema = z.object({
    username: z.string().min(5, { message: "Must be 5 or more characters long" })
})