import { UserRoles } from '@/lib/constants'
import * as z from 'zod'

const LoginSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    twoFACode: z.optional(z.string())
})

const RegisterSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(8, {
        message: 'Minimum 8 characters required'
    }),
    name: z.string().min(2, {
        message: 'Name is required'
    })
})

/** Used to send the password reset link to the user email */
const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
})

/** Used to create a new password */
const ResetPasswordSchema = z.object({
    password: z.string().min(8, {
        message: 'Minimum 8 characters required'
    }),
})

/** Used to update user settings */
const SettingsSchema = z.object({
    name: z.string().min(2, {
        message: 'Name is required'
    }),
    is2FAenabled: z.boolean(),
    role: z.enum([UserRoles.ADMIN, UserRoles.USER]),
    email: z.string().email({ message: 'Email is required' }),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    hasCredentials: z.optional(z.boolean())
    // Handle validation when the users want to change their password:
}).refine((data)=> {
    if (data.password && !data.newPassword) {
        return false
    }
    return true

} , {
    message: 'Your new password is not valid',
    path: ['newPassword']
})
.refine((data)=> {
    if (data.hasCredentials && !data.password && data.newPassword) {
        return false
    }
    return true

} , {
    message: 'Your current password is required to set a new one',
    path: ['password']
})

const ProductSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    price: z.string().min(1, { message: 'Price is required' })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val >= 0, { 
            message: 'Price must be a valid positive number' 
        }),
    quantity: z.string().min(1, { message: 'Quantity is required' })
        .transform((val) => parseInt(val))
        .refine((val) => !isNaN(val) && val >= 0, { 
            message: 'Quantity must be a valid positive number' 
        }),
    image: z.string().optional()
})

export {
    LoginSchema,
    RegisterSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    SettingsSchema,
    ProductSchema
}