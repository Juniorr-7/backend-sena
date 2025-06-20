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
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(31), createPrograma);
router.get('/', verifyToken, verifyPermiso(32), getAllProgramas);
router.get('/:id', verifyToken, verifyPermiso(33), getProgramaById);
router.put('/:id', verifyToken, verifyPermiso(34), updatePrograma);
router.delete('/:id', verifyToken, verifyPermiso(35), deletePrograma);

router.get('/:id/cursos', verifyToken, getCursosByProgramaId);

export default { prefix: '/programas', router };
