import mongoose from 'mongoose';

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ToDo', toDoSchema);