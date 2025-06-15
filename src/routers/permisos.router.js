import { Router } from 'express';
import {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
} from '../controllers/permisos.controller.js';

const router = Router();

router.get('/', getAllPermisos);
router.get('/:id', getPermisoById);
router.post('/', createPermiso);
router.put('/:id', updatePermiso);
router.delete('/:id', deletePermiso);

export default { prefix: "/permisos", router };
