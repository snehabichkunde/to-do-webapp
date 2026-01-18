import * as toDoRepository from '../repositories/to.do.repository.js';
import { DEFAULT_TAG } from '../constants/tags.constants.js';

export const getToDos = (filters = {}) => toDoRepository.getAll(filters);

export const saveToDo = (toDoData) => {
  const { content, tags, userId, priority, dueDate } = toDoData;
  return toDoRepository.create({
    content,
    tags: tags && tags.length > 0 ? tags : [DEFAULT_TAG],
    userId,
    priority,
    dueDate,
  });
};

export const updateToDo = async (id, toDoData, userId) => {
  const { content, tags, isCompleted, priority, dueDate } = toDoData;
  
  // First check if todo exists and belongs to user
  const existingToDo = await toDoRepository.findById(id);
  
  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
  }
  
  return toDoRepository.updateById(id, {
    content,
    tags: tags && tags.length > 0 ? tags : [DEFAULT_TAG], // ✅ Handle default tag
    isCompleted,
    priority,
    dueDate,
  });
};

export const deleteToDo = async (id, userId) => {
  // First check if todo exists and belongs to user
  const existingToDo = await toDoRepository.findById(id);
  
  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
  }
  
  return toDoRepository.deleteById(id);
};