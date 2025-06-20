import { Router } from 'express';
import {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
} from '../controllers/permisos.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(11), createPermiso);
router.get('/', verifyToken, verifyPermiso(12), getAllPermisos);
router.get('/:id', verifyToken, verifyPermiso(13), getPermisoById);
router.put('/:id', verifyToken, verifyPermiso(14), updatePermiso);
router.delete('/:id', verifyToken, verifyPermiso(15), deletePermiso);

export default { prefix: "/permisos", router };
