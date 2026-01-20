import * as toDoRepository from '../repositories/to.do.repository.js';
import { ensureDefaultTag, normalizeTags } from '../utils/to.do.utils.js';

export const getToDos = (filters = {}) => toDoRepository.getAll(filters);

export const saveToDo = (toDoData) => {
  const { content, tags, userId, priority, startDate, dueDate } = toDoData;
  
  const normalizedTags = normalizeTags(tags);
  const finalTags = ensureDefaultTag(normalizedTags);
  
  const todoData = {
    content,
    tags: finalTags,
    userId,
    priority,
  };

  if (startDate !== undefined) {
    todoData.startDate = new Date(startDate);
  }

  if (dueDate !== undefined) {
    todoData.dueDate = new Date(dueDate);
  }

  return toDoRepository.create(todoData);
};

export const updateToDo = async (id, toDoData, userId) => {
  const { content, tags, isCompleted, priority, startDate, dueDate } = toDoData;
  
  const existingToDo = await toDoRepository.findById(id);
  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
  }
  
  const updateData = {};
  
  if (content !== undefined) updateData.content = content;
  if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
  if (priority !== undefined) updateData.priority = priority;
  if (startDate !== undefined) updateData.startDate = new Date(startDate);
  if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
  
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