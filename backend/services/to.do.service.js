import * as toDoRepository from '../repositories/to.do.repository.js';
import { ensureDefaultTag, normalizeTags } from '../utils/to.do.utils.js';

export const getToDos = (filters = {}) => toDoRepository.getAll(filters);

export const saveToDo = (toDoData) => {
  const { content, tags, userId, priority, dueDate } = toDoData;
  
  // Normalize and ensure default tag
  const normalizedTags = normalizeTags(tags);
  const finalTags = ensureDefaultTag(normalizedTags);
  
  return toDoRepository.create({
    content,
    tags: finalTags,
    userId,
    priority,
    dueDate,
  });
};

export const updateToDo = async (id, toDoData, userId) => {
  const { content, tags, isCompleted, priority, dueDate } = toDoData;
  
  // Check if todo exists and belongs to user
  const existingToDo = await toDoRepository.findById(id);
  
  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
  }
  
  // Build update object
  const updateData = {
    content,
    isCompleted,
    priority,
    dueDate,
  };
  
  //Only process tags if provided
  if (tags !== undefined) {
    const normalizedTags = normalizeTags(tags);
    updateData.tags = ensureDefaultTag(normalizedTags);
  }
  
  return toDoRepository.updateById(id, updateData);
};

export const deleteToDo = async (id, userId) => {
  const existingToDo = await toDoRepository.findById(id);
  
  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
  }
  
  return toDoRepository.deleteById(id);
};