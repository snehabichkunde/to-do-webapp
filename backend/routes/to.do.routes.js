import { Router } from 'express';
import {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
  getSystemTags,
} from '../controller/to.do.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);   // protect all routes 

router.get('/get', getToDos);
router.post('/save', saveToDo);
router.put('/update/:id', updateToDo);
router.delete('/delete/:id', deleteToDo);
router.get('/system-tags', getSystemTags);

export default router;