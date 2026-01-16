import * as toDoRepository from '../repositories/toDoRepository.js';

export const getToDos = () => toDoRepository.getAll();
export const saveToDo = (toDo) => toDoRepository.create({ toDo });
export const updateToDo = (id, toDo) => toDoRepository.updateById(id, { toDo });
export const deleteToDo = (id) => toDoRepository.deleteById(id);