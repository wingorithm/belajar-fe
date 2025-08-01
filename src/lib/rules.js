import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(1, { message: "Password is required." }).trim(),
});

export const RegisterFormSchema = z
    .object({
        email: z.string().email({ message: "Please enter a valid email." }).trim(),
        password: z
            .string()
            .min(1, { message: "Not be empty" })
            .min(5, { message: "Be at least 5 characters long" })
            .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            .regex(/[0-9]/, { message: "Contain at least one number." })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Contain at least one special character.",
            })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password fields do not match.",
                path: ["confirmPassword"],
            });
        }
    });