import { Router } from 'express';
import {
  getAllProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma,
  getCursosByProgramaId,
} from '../controllers/programas.controller.js';

const router = Router();

router.get('/', getAllProgramas);
router.get('/:id', getProgramaById);
router.post('/', createPrograma);
router.put('/:id', updatePrograma);
router.delete('/:id', deletePrograma);

router.get('/:id/cursos', getCursosByProgramaId);

export default { prefix: '/programas', router };
