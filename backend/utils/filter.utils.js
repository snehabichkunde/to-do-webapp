import DateFilter from '../constants/date.filter.constants.js';
import Priority from '../constants/priority.todo.js';

export const buildTodoFilters = (queryParams, userId) => {
  const { 
    isCompleted, 
    tags, 
    search, 
    priority, 
    dueDate,
    dateFilter,
    startDate,
    endDate,
    specificDate
  } = queryParams;

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

  // New date filtering options
  if (dateFilter) {
    filters.dateFilter = dateFilter;
  }

  // Specific date search
  if (specificDate) {
    filters.specificDate = specificDate;
  }

  // Date range search
  if (startDate || endDate) {
    filters.dateRange = {
      start: startDate,
      end: endDate,
    };
  }

  return filters;
};

export const buildMongoQuery = (filters) => {
  const { 
    userId, 
    isCompleted, 
    tags, 
    search, 
    priority, 
    dueDate,
    dateFilter,
    specificDate,
    dateRange
  } = filters;

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

  // Handle legacy dueDate parameter
  if (dueDate) {
    if (dueDate === DateFilter.TODAY) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.dueDate = { $gte: today, $lt: tomorrow };
    } else if (dueDate === DateFilter.OVERDUE ) {
      query.dueDate = { $lt: new Date() };
      query.isCompleted = false;
    } else if (dueDate === DateFilter.THIS_WEEK ) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      query.dueDate = { $gte: today, $lte: nextWeek };
    } else {
      // Specific date
      const date = new Date(dueDate);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      query.dueDate = { $gte: startOfDay, $lte: endOfDay };
    }
  }

  // New dateFilter parameter (takes precedence over legacy dueDate)
  if (dateFilter) {
    const now = new Date();
    
    switch (dateFilter) {
      case DateFilter.TODAY:
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        query.dueDate = {
          $gte: startOfToday,
          $lte: endOfToday,
        };
        break;
        
      case DateFilter.THIS_WEEK:
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); 
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); 
        endOfWeek.setHours(23, 59, 59, 999);
        
        query.dueDate = {
          $gte: startOfWeek,
          $lte: endOfWeek,
        };
        break;
        
      case DateFilter.OVERDUE:
        const currentTime = new Date();
        query.dueDate = { $lt: currentTime };
        query.isCompleted = false;
        break;
    }
  }

  // Specific date search
  if (specificDate) {
    const date = new Date(specificDate);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    query.dueDate = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  // Date range search
  if (dateRange) {
    query.dueDate = {};
    
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      startDate.setHours(0, 0, 0, 0);
      query.dueDate.$gte = startDate;
    }
    
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      query.dueDate.$lte = endDate;
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

  if (sanitized.priority && 
      !Object.values(Priority).includes(sanitized.priority)) {
    delete sanitized.priority;
  }

  if (sanitized.dateFilter && 
      !Object.values(DateFilter).includes(sanitized.dateFilter)) {
    delete sanitized.dateFilter;
  }

  return sanitized;
};