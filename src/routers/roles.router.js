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

const router = Router();

router.get('/', verifyToken, getAllRoles);
router.get('/:id', verifyToken, getRolById);
router.post('/', verifyToken, createRol);
router.put('/:id', verifyToken, updateRol);
router.delete('/:id', verifyToken, deleteRol);
router.get('/:id/usuarios', verifyToken, getUsuariosByRolId);

export default { prefix: "/roles", router };
