import mongoose from 'mongoose';
import { DEFAULT_TAG } from '../constants/tags.constants.js';

const toDoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [DEFAULT_TAG],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: function() {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return today;
      },
    },
  },
  {
    timestamps: true,
  }
);

toDoSchema.index({ userId: 1, isCompleted: 1 });
toDoSchema.index({ tags: 1 });
toDoSchema.index({ dueDate: 1 });
toDoSchema.index({ startDate: 1 });
toDoSchema.index({ content: 'text' });

export default mongoose.model('ToDo', toDoSchema);