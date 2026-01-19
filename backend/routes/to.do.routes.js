import { Router } from 'express';
import {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
} from '../controller/to.do.controller.js';

const router = Router();

router.get('/get', getToDos);
router.post('/save', saveToDo);
router.put('/update/:id', updateToDo);
router.delete('/delete/:id', deleteToDo);

export default router;