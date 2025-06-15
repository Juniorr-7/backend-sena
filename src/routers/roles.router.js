import { Router } from 'express';
import {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
  getUsuariosByRolId,
} from '../controllers/roles.controller.js';

const router = Router();

router.get('/', getAllRoles);
router.get('/:id', getRolById);
router.post('/', createRol);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);
router.get('/:id/usuarios', getUsuariosByRolId);

export default { prefix: "/roles", router };
