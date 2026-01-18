import * as toDoRepository from '../repositories/to.do.repository.js';
import { DEFAULT_TAG, SYSTEM_TAGS } from '../constants/tags.constants.js';


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

export const updateToDo = (id, toDoData) => {
  const { content, tags, isCompleted, priority, dueDate } = toDoData;
  return toDoRepository.updateById(id, {
    content,
    tags,
    isCompleted,
    priority,
    dueDate,
  });
};

export const deleteToDo = (id) => toDoRepository.deleteById(id);
export const getSystemTags = () => SYSTEM_TAGS;