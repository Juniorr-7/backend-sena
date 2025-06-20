import { Router } from 'express';
import {
  getAllProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma,
  getCursosByProgramaId,
} from '../controllers/programas.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllProgramas);
router.get('/:id', verifyToken, getProgramaById);
router.post('/', verifyToken, createPrograma);
router.put('/:id', verifyToken, updatePrograma);
router.delete('/:id', verifyToken, deletePrograma);

router.get('/:id/cursos', verifyToken, getCursosByProgramaId);

export default { prefix: '/programas', router };
