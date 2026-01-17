import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: 'Name cannot be empty' })
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must not exceed 50 characters' })
    .trim(),
  
  email: z
    .string({ message: "Email is required" })
    .email({ message: 'Please provide a valid email address' })
    .toLowerCase()
    .trim(),
  
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' }),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: 'Please provide a valid email address' })
    .toLowerCase()
    .trim(),
  
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: 'Password is required' }),
});