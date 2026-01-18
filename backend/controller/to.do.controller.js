import { StatusCodes } from 'http-status-codes';
import * as toDoService from '../services/to.do.service.js';
import asyncHandler from '../utils/async.handler.js';
import { SYSTEM_TAGS } from '../constants/tags.constants.js';

export const getToDos = asyncHandler(async (req, res) => {
  const { userId, isCompleted, tags, search } = req.query;
  
  const filters = {};
  if (userId) filters.userId = userId;
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
  const toDo = await toDoService.saveToDo(req.body);
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'ToDo created successfully',
    data: toDo,
  });
});

export const updateToDo = asyncHandler(async (req, res) => {
  const updatedToDo = await toDoService.updateToDo(req.params.id, req.body);
  
  if (!updatedToDo) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Todo not found',
    });
  }
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Updated successfully',
    data: updatedToDo,
  });
});

export const deleteToDo = asyncHandler(async (req, res) => {
  const deletedToDo = await toDoService.deleteToDo(req.params.id);
  
  if (!deletedToDo) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Todo not found',
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