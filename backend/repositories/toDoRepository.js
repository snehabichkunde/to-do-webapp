import ToDoModel from '../models/ToDoModel.js';

export const getAll = () => ToDoModel.find();
export const create = (data) => ToDoModel.create(data);
export const updateById = (id, data) => ToDoModel.findByIdAndUpdate(id, data, { new: true });
export const deleteById = (id) => ToDoModel.findByIdAndDelete(id);