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

const router = Router();

router.get('/', verifyToken, getAllModulos);
router.get('/:id', verifyToken, getModuloById);
router.post('/', verifyToken, createModulo);
router.put('/:id', verifyToken, updateModulo);
router.delete('/:id', verifyToken, deleteModulo);
router.get('/:id/rutas', verifyToken, getRutasByModuloId);

export default { prefix: "/modulos", router };
