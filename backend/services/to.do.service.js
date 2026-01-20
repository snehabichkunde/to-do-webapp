import * as toDoRepository from '../repositories/to.do.repository.js';
import { ensureDefaultTag, normalizeTags } from '../utils/to.do.utils.js';
import { buildCreateTodoData } from '../utils/build.todo.data.js';


export const getToDos = (filters = {}) => toDoRepository.getAll(filters);


export const saveToDo = (toDoData) => {
  const todoData = buildCreateTodoData(toDoData, { forUpdate: false });
  return toDoRepository.create(todoData);
};

export const updateToDo = async (id, updateData, userId) => {
  const existingToDo = await toDoRepository.findById(id);

  if (!existingToDo || existingToDo.userId.toString() !== userId.toString()) {
    return null;
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