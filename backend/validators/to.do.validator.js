import { z } from 'zod';
import { SYSTEM_TAGS } from '../constants/tags.constants.js';

export const createToDoSchema = z.object({
  content: z
    .string({ message: 'Content is required' })
    .min(1, { message: 'Content cannot be empty' })
    .max(500, { message: 'Content must not exceed 500 characters' })
    .trim(),
  
  tags: z
    .array(z.string())
    .optional()
    .default([])
    .refine(
      (tags) => tags.every(tag => tag.length > 0 && tag.length <= 30),
      { message: 'Each tag must be between 1 and 30 characters' }
    ),
  
  priority: z
    .enum(['low', 'medium', 'high'], {
      message: 'Priority must be low, medium, or high',
    })
    .optional()
    .default('medium'),
  
  dueDate: z
    .string()
    .datetime({ message: 'Invalid date format' })
    .optional()
    .or(z.date().optional()),
});

export const updateToDoSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Content cannot be empty' })
    .max(500, { message: 'Content must not exceed 500 characters' })
    .trim()
    .optional(),
  
  tags: z
    .array(z.string())
    .optional()
    .refine(
      (tags) => !tags || tags.every(tag => tag.length > 0 && tag.length <= 30),
      { message: 'Each tag must be between 1 and 30 characters' }
    ),
  
  isCompleted: z
    .boolean({ message: 'isCompleted must be a boolean' })
    .optional(),
  
  priority: z
    .enum(['low', 'medium', 'high'], {
      message: 'Priority must be low, medium, or high',
    })
    .optional(),
  
  dueDate: z
    .string()
    .datetime({ message: 'Invalid date format' })
    .optional()
    .or(z.date().optional())
    .nullable(),
});

export const todoIdSchema = z.object({
  id: z
    .string({ message: 'Todo ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Todo ID format' }),
});

export const getToDoQuerySchema = z.object({
  isCompleted: z
    .enum(['true', 'false'])
    .optional()
    .transform(val => val === 'true'),
  
  tags: z
    .string()
    .optional()
    .transform(val => val ? val.split(',') : undefined),
  
  search: z
    .string()
    .max(100, { message: 'Search query too long' })
    .optional(),
});