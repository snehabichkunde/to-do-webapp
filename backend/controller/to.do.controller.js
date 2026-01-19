import { StatusCodes } from 'http-status-codes';
import * as toDoService from '../services/to.do.service.js';
import asyncHandler from '../utils/async.handler.js';
import { SYSTEM_TAGS } from '../constants/tags.constants.js';

export const getToDos = asyncHandler(async (req, res) => {
  const { isCompleted, tags, search } = req.query;
  
  const filters = {
    userId: req.user._id, //Get userId from authenticated user
  };
  
  if (isCompleted !== undefined) filters.isCompleted = isCompleted === 'true';
  if (tags) filters.tags = tags.split(',');
  if (search) filters.search = search;
  
  const toDos = await toDoService.getToDos(filters);
  
  res.status(StatusCodes.OK).json({
    success: true,
    count: toDos.length,
    data: toDos,
  });
});

export const saveToDo = asyncHandler(async (req, res) => {
  // Automatically add userId from authenticated user
  const toDoData = {
    ...req.body,
    userId: req.user._id,
  };
  
  const toDo = await toDoService.saveToDo(toDoData);
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'ToDo created successfully',
    data: toDo,
  });
});

export const updateToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Verify the todo belongs to the authenticated user
  const updatedToDo = await toDoService.updateToDo(
    id, 
    req.body, 
    req.user._id
  );
  
  if (!updatedToDo) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Todo not found or you do not have permission to update it',
    });
  }
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Updated successfully',
    data: updatedToDo,
  });
});

export const deleteToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  //Verify the todo belongs to the authenticated user
  const deletedToDo = await toDoService.deleteToDo(id, req.user._id);
  
  if (!deletedToDo) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Todo not found or you do not have permission to delete it',
    });
  }
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Deleted successfully',
  });
});

export const getSystemTags = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    data: SYSTEM_TAGS,
  });
});