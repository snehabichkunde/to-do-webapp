const validateRequest = (schema) => {
  return (req, res, next) => {
    console.log('📥 Request body:', req.body);
    console.log('📋 Schema:', schema._def.typeName);
    
    try {
      schema.parse(req.body);
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;