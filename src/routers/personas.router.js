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
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(26), createPersona);
router.get('/', verifyToken, verifyPermiso(27), getAllPersonas);
router.get('/:id', verifyToken, verifyPermiso(28), getPersonaById);
router.put('/:id', verifyToken, verifyPermiso(29), updatePersona);
router.delete('/:id', verifyToken, verifyPermiso(30), deletePersona);

router.get('/:id/matricula', verifyToken, getMatriculaByPersonaId);

export default { prefix: "/personas", router };
