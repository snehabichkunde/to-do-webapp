import { z } from 'zod';
import { SYSTEM_TAGS } from '../constants/tags.constants.js';
import Priority from '../constants/priority.todo.js';
import DateFilter from '../constants/date.filter.constants.js';
import { ensureDefaultTag, normalizeTags } from '../utils/to.do.utils.js';

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
    .enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH], {
      message: 'Priority must be low, medium, or high',
    })
    .optional()
    .default(Priority.MEDIUM),
  startDate: z
    .string()
    .datetime({ message: 'Invalid start date format' })
    .optional()
    .or(z.date().optional()),
  dueDate: z
    .string()
    .datetime({ message: 'Invalid due date format' })
    .optional()
    .or(z.date().optional()),
}).refine(
  (data) => {
    if (data.startDate && data.dueDate) {
      const start = new Date(data.startDate);
      const due = new Date(data.dueDate);
      return due >= start;
    }
    return true;
  },
  {
    message: 'Due date must be equal to or after start date',
    path: ['dueDate'],
  }
);

export const updateToDoSchema = z.object({
  tags: z
    .array(z.string())
    .optional()
    .transform(tags => tags ? ensureDefaultTag(normalizeTags(tags)) : undefined),

  content: z.string().optional(),
  isCompleted: z.boolean().optional(),
  priority: z.enum(['low','medium','high']).optional(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
}).refine(
    (data) =>
      !data.startDate ||
      !data.dueDate ||
      data.startDate <= data.dueDate,
    {
      message: 'Start date cannot be after due date',
      path: ['startDate'],
    }
  );

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
  priority: z
    .enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH])
    .optional(),
  dueDate: z
    .string()
    .optional(),
  dateFilter: z
    .enum([DateFilter.TODAY, DateFilter.THIS_WEEK, DateFilter.OVERDUE], {
      message: 'Date filter must be today, thisWeek, or overdue',
    })
    .optional(),
  specificDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { 
      message: 'Date must be in YYYY-MM-DD format (e.g., 2026-01-20)' 
    })
    .optional(),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { 
      message: 'Start date must be in YYYY-MM-DD format (e.g., 2026-01-20)' 
    })
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { 
      message: 'End date must be in YYYY-MM-DD format (e.g., 2026-01-20)' 
    })
    .optional(),
});