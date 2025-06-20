import { Router } from 'express';
import {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
} from '../controllers/permisos.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllPermisos);
router.get('/:id', verifyToken, getPermisoById);
router.post('/', verifyToken, createPermiso);
router.put('/:id', verifyToken, updatePermiso);
router.delete('/:id', verifyToken, deletePermiso);

export default { prefix: "/permisos", router };
