import { Router } from 'express';
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default { prefix: "/usuarios", router };
