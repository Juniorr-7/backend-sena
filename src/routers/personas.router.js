import { Router } from 'express';
import {
  getAllPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
  getMatriculaByPersonaId,
} from '../controllers/personas.controller.js';

const router = Router();

router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);
router.post('/', createPersona);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);

router.get('/:id/matricula', getMatriculaByPersonaId);

export default { prefix: "/personas", router };
