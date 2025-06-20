import { Router } from 'express';
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllUsuarios);
router.get('/:id', verifyToken, getUsuarioById);
router.post('/', verifyToken, createUsuario);
router.put('/:id', verifyToken, updateUsuario);
router.delete('/:id', verifyToken, deleteUsuario);

export default { prefix: "/usuarios", router };
