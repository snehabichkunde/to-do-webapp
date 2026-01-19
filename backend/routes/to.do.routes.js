import { Router } from 'express';
import {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
  getSystemTags,
} from '../controller/to.do.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import validateRequest from '../middleware/validate.request.js';
import {
  createToDoSchema,
  updateToDoSchema,
} from '../validators/to.do.validator.js';

const router = Router();

router.use(authMiddleware);

router.get('/get', getToDos);
router.post('/save', validateRequest(createToDoSchema), saveToDo);
router.put('/update/:id', validateRequest(updateToDoSchema), updateToDo);
router.delete('/delete/:id', deleteToDo);
router.get('/system-tags', getSystemTags);

export default router;