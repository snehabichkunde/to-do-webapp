import * as toDoRepository from '../repositories/to.do.repository.js';

export const getToDos = () => toDoRepository.getAll();
export const saveToDo = (toDo) => toDoRepository.create({ toDo });
export const updateToDo = (id, toDo) => toDoRepository.updateById(id, { toDo });
export const deleteToDo = (id) => toDoRepository.deleteById(id);