import ToDoModel from '../models/to.do.model.js';

export const getAll = (filters = {}) => {
  const { userId, isCompleted, tags, search } = filters;
  
  let query = {};
  
  if (userId) query.userId = userId;
  
  if (isCompleted !== undefined) {
    query.isCompleted = isCompleted;
  }
  
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  
  if (search) {
    query.$text = { $search: search };
  }
  
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