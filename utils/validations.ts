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


export const UserTypeSchema = z.object({
    userType: z.enum(["creator", "business"], {
        required_error: "You need to select user type.",
    }),
});

export const BusinessFormDataSchema = z.object({
    companyName: z.string().min(1, 'Company name is required').max(50, "Maximum company name is upto 50 characters"),
    industry: z.string().min(1, 'Industry is required').max(50, "Maximum industry field is upto 50 characters"),
    description: z.string().min(25, 'Description is required minimum 25 characters').max(250, "Maximum company name is upto 250 characters"),
    country: z.string().min(1, 'Country is required').max(30, "Maximum country field is upto 30 characters"),
    state: z.string().min(1, 'State is required').max(30, "Maximum state field is upto 30 characters"),
    city: z.string().min(1, 'City is required').max(30, "Maximum city field is upto 30 characters"),
    address: z.string().min(1, 'Address is required').max(100, "Maximum address field is upto 100 characters"),
    zip: z.string().min(1, 'Zip is required').max(15, "Maximum state field is upto 15 characters")
})

export const CreatorFormDataSchema = z.object({
    fullName: z.string().min(1, 'Full name is required').max(50, "Maximum full name is upto 50 characters"),
    contentNiche: z.string().min(25, 'contentNiche is required minimum 25 characters').max(250, "Maximum contentNiche is upto 250 characters"),
    description: z.string().min(25, 'Description is required minimum 25 characters').max(250, "Maximum company name is upto 250 characters"),
    country: z.string().min(1, 'Country is required').max(30, "Maximum country field is upto 30 characters"),
    state: z.string().min(1, 'State is required').max(30, "Maximum state field is upto 30 characters"),
    city: z.string().min(1, 'City is required').max(30, "Maximum city field is upto 30 characters"),
    address: z.string().min(1, 'Address is required').max(100, "Maximum address field is upto 100 characters"),
    zip: z.string().min(1, 'Zip is required').max(15, "Maximum state field is upto 15 characters")
})




export type SignUpFormType = z.infer<typeof SignUpFormSchema>

export type LoginFormType = z.infer<typeof LoginFormSchema>

export type UserTypeType = z.infer<typeof UserTypeSchema>


