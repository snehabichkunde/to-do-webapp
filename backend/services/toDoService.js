const toDoRepository = require('../repositories/toDoRepository');

exports.getToDos = () => toDoRepository.getAll();
exports.saveToDo = (toDo) => toDoRepository.create({ toDo });
exports.updateToDo = (id, toDo) => toDoRepository.updateById(id, { toDo });
exports.deleteToDo = (id) => toDoRepository.deleteById(id);
