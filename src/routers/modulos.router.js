import { Router } from 'express';
import {
  getAllModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
  getRutasByModuloId,
} from '../controllers/modulos.controller.js';

const router = Router();

router.get('/', getAllModulos);
router.get('/:id', getModuloById);
router.post('/', createModulo);
router.put('/:id', updateModulo);
router.delete('/:id', deleteModulo);
router.get('/:id/rutas', getRutasByModuloId);

export default { prefix: "/modulos", router };
