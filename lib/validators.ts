import * as z from "zod";
import { ROLES } from "./consts";

export const baseSignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum([ROLES.CREATOR, ROLES.USER]),
    currentIndustry: z.string().min(1, "Current industry is required"),
    notableProjects: z.string().optional(),
});

// Unified schema that includes all possible fields
export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum([ROLES.CREATOR, ROLES.USER]),
    currentIndustry: z.string().min(1, "Current industry is required"),
    notableProjects: z.string().optional(),
    // Creator fields
    aiMlStack: z.array(z.string()).optional(),
    // User fields
    roleTitle: z.string().optional(),
    techStack: z.array(z.string()).optional(),
}).refine((data) => {
    // Additional validation based on role
    if (data.role === ROLES.CREATOR) {
        return data.aiMlStack && data.aiMlStack.length > 0;
    }
    if (data.role === ROLES.USER) {
        return data.roleTitle && data.roleTitle.length > 0 && data.techStack && data.techStack.length > 0;
    }
    return true;
}, {
    message: "Please complete all required fields for your selected role",
    path: ["role"], // Show error at the role field level
});
  
export const creatorSignupSchema = baseSignupSchema.extend({
    aiMlStack: z.array(z.string()).min(1, "Please select at least one AI/ML technology"),
});

export const userSignupSchema = baseSignupSchema.extend({
    roleTitle: z.string().min(1, "Role title is required"),
    techStack: z.array(z.string()).min(1, "Please select at least one technology"),
});

export type BaseSignupFormData = z.infer<typeof baseSignupSchema>;
export type CreatorSignupFormData = z.infer<typeof creatorSignupSchema>;
export type UserSignupFormData = z.infer<typeof userSignupSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;