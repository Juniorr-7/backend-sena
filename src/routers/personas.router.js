import { Router } from 'express';
import {
  getAllPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
  getMatriculaByPersonaId,
} from '../controllers/personas.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllPersonas);
router.get('/:id', verifyToken, getPersonaById);
router.post('/', verifyToken, createPersona);
router.put('/:id', verifyToken, updatePersona);
router.delete('/:id', verifyToken, deletePersona);

router.get('/:id/matricula', verifyToken, getMatriculaByPersonaId);

export default { prefix: "/personas", router };
