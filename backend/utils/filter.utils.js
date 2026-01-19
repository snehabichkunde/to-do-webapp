export const buildTodoFilters = (queryParams, userId) => {
  const { isCompleted, tags, search, priority, dueDate } = queryParams;
  
  const filters = {
    userId, 
  };
  
  if (isCompleted !== undefined) {
    filters.isCompleted = isCompleted === 'true';
  }
  
  if (tags) {
    filters.tags = Array.isArray(tags) ? tags : tags.split(',');
  }
  
  if (priority) {
    filters.priority = priority;
  }
  
  if (search) {
    filters.search = search.trim();
  }
  
  if (dueDate) {
    filters.dueDate = dueDate;
  }
  
  return filters;
};

export const buildMongoQuery = (filters) => {
  const { userId, isCompleted, tags, search, priority, dueDate } = filters;
  
  const query = {};
  
  if (userId) query.userId = userId;
  
  if (isCompleted !== undefined) {
    query.isCompleted = isCompleted;
  }
  
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  
  if (priority) {
    query.priority = priority;
  }
  
  if (search) {
    query.$text = { $search: search };
  }
  
  if (dueDate) {
    if (dueDate === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.dueDate = { $gte: today, $lt: tomorrow };
    } else if (dueDate === 'overdue') {
      query.dueDate = { $lt: new Date() };
      query.isCompleted = false;
    } else if (dueDate === 'week') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      query.dueDate = { $gte: today, $lte: nextWeek };
    } else {
      query.dueDate = new Date(dueDate);
    }
  }
  
  return query;
};


export const sanitizeFilters = (filters) => {
  const sanitized = { ...filters };
  
  if (sanitized.search) {
    sanitized.search = sanitized.search.trim().replace(/[<>]/g, '');
  }
  
  if (sanitized.tags && typeof sanitized.tags === 'string') {
    sanitized.tags = sanitized.tags.split(',').map(tag => tag.trim());
  }
  
  if (sanitized.priority && !['low', 'medium', 'high'].includes(sanitized.priority)) {
    delete sanitized.priority;
  }
  
  return sanitized;
};