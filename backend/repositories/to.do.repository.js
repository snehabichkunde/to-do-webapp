import ToDoModel from '../models/to.do.model.js';
import { buildMongoQuery } from '../utils/filter.utils.js';

export const getAll = (filters = {}) => {
  const query = buildMongoQuery(filters);
  
  return ToDoModel.find(query).sort({ createdAt: -1 });
};

export const create = (data) => ToDoModel.create(data);

export const updateById = (id, data) => 
  ToDoModel.findByIdAndUpdate(id, data, { 
    new: true, 
    runValidators: true 
  });

export const deleteById = (id) => ToDoModel.findByIdAndDelete(id);

export const findById = (id) => ToDoModel.findById(id);