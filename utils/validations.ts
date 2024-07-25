import { z } from "zod";

export const SignUpFormSchema = z.object({
    email: z.string().email("Incorrect Email"),
    password: z.string().min(8, { message: "Password must length must be 8 and above" }).max(30, { message: "Maximum Password length is 30" }).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/),
    confirmPassword: z.string().min(8),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords must match",
        path: ["confirmPassword"],
    }
);


export const LoginFormSchema = z.object({
    email: z.string().email("Incorrect Email"),
    password: z.string().min(8, { message: "Password must length must be 8 and above" }).max(30, { message: "Maximum Password length is 30" }).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/),
});


export type SignUpFormType = z.infer<typeof SignUpFormSchema>

export type LoginFormType = z.infer<typeof LoginFormSchema>


