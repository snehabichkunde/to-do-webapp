const toDoService = require('../services/toDoService');

exports.getToDos = async (req, res) => {
  try {
    const toDos = await toDoService.getToDos();
    res.status(200).json(toDos);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.saveToDo = async (req, res) => {
  try {
    const toDo = await toDoService.saveToDo(req.body.toDo);
    res.status(201).json(toDo);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.updateToDo = async (req, res) => {
  try {
    await toDoService.updateToDo(req.params.id, req.body.toDo);
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    await toDoService.deleteToDo(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
