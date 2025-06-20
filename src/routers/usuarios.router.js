import { Router } from 'express';
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(21), createUsuario);
router.get('/', verifyToken, verifyPermiso(22), getAllUsuarios);
router.get('/:id', verifyToken, verifyPermiso(23), getUsuarioById);
router.put('/:id', verifyToken, verifyPermiso(24), updateUsuario);
router.delete('/:id', verifyToken, verifyPermiso(25), deleteUsuario);

export default { prefix: "/usuarios", router };
