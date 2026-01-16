const ToDoModel = require('../models/ToDoModel');

exports.getAll = () => ToDoModel.find();
exports.create = (data) => ToDoModel.create(data);
exports.updateById = (id, data) => ToDoModel.findByIdAndUpdate(id, data);
exports.deleteById = (id) => ToDoModel.findByIdAndDelete(id);
