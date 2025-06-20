import { Router } from 'express';
import {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
  getUsuariosByRolId,
} from '../controllers/roles.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(16), createRol);
router.get('/', verifyToken, verifyPermiso(17), getAllRoles);
router.get('/:id', verifyToken, verifyPermiso(18), getRolById);
router.put('/:id', verifyToken, verifyPermiso(19), updateRol);
router.delete('/:id', verifyToken, verifyPermiso(20), deleteRol);
router.get('/:id/usuarios', verifyToken, getUsuariosByRolId);

export default { prefix: "/roles", router };
