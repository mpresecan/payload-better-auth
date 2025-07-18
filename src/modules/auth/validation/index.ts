import * as z from "zod"

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  })
  .min(5, {
    message: "Email must be made of at least 5 characters"
  })
  .max(64, {
    message: "Email must be made of at most 64 characters"
  })
  .email({
    message: "Please enter a valid email address"
  })

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
  .min(8, {
    message: "Password must be made of at least 8 characters"
  })
  .max(256, {
    message: "Password must be made of at most 256 characters"
  })

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: z.string().max(6).optional()
})

export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter"
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter"
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*]/, {
        message:
          "Password must contain at least one special character (e.g., !@#$%^&*)"
      }),
    confirmPassword: z.string()
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export const signUpWithPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, {
      message:
        "Password must contain at least one special character (e.g., !@#$%^&*)"
    })
})
