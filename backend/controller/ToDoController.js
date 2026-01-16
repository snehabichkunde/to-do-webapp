import { StatusCodes } from 'http-status-codes';
import * as toDoService from '../services/toDoService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getToDos = asyncHandler(async (req, res) => {
  const toDos = await toDoService.getToDos();
  res.status(StatusCodes.OK).json({
    success: true,
    data: toDos,
  });
});

export const saveToDo = asyncHandler(async (req, res) => {
  const toDo = await toDoService.saveToDo(req.body.toDo);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'ToDo created successfully',
    data: toDo,
  });
});

export const updateToDo = asyncHandler(async (req, res) => {
  const updatedToDo = await toDoService.updateToDo(req.params.id, req.body.toDo);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Updated successfully',
    data: updatedToDo,
  });
});

export const deleteToDo = asyncHandler(async (req, res) => {
  await toDoService.deleteToDo(req.params.id);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Deleted successfully',
  });
});