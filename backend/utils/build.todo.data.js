import { ensureDefaultTag, normalizeTags } from './to.do.utils.js';

export const buildCreateTodoData = (input) => {
  const {
    content,
    tags,
    userId,
    priority,
    startDate,
    dueDate,
  } = input;

  return {
    content,
    userId,
    priority,
    startDate: startDate ? new Date(startDate) : undefined,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    tags: ensureDefaultTag(normalizeTags(tags)),
  };
};
