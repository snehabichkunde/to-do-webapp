import { DEFAULT_TAG } from '../constants/tags.constants.js';


export const ensureDefaultTag = (tags) => {
  if (!tags || tags.length === 0) {
    return [DEFAULT_TAG];
  }
  return tags;
};


export const normalizeTags = (tags) => {
  if (!tags || !Array.isArray(tags)) return [];
  
  return [...new Set(tags.map(tag => tag.trim().toLowerCase()))]
    .filter(tag => tag.length > 0);
};


export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};


export const formatToDoResponse = (todo) => {
  return {
    id: todo._id,
    content: todo.content,
    tags: todo.tags,
    isCompleted: todo.isCompleted,
    priority: todo.priority,
    dueDate: todo.dueDate,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    isOverdue: isOverdue(todo.dueDate) && !todo.isCompleted,
  };
};


export const sanitizeSearchQuery = (query) => {
  if (!query) return '';
  return query.trim().replace(/[<>]/g, '');
};