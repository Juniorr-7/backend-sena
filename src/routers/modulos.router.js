import { Router } from 'express';
import {
  getAllModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
  getRutasByModuloId,
} from '../controllers/modulos.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(1), createModulo);
router.get('/', verifyToken, verifyPermiso(2), getAllModulos);
router.get('/:id', verifyToken, verifyPermiso(3), getModuloById);
router.put('/:id', verifyToken, verifyPermiso(4), updateModulo);
router.delete('/:id', verifyToken, verifyPermiso(5), deleteModulo);
router.get('/:id/rutas', verifyToken, getRutasByModuloId);

export default { prefix: "/modulos", router };
