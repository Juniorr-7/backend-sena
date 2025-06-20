import { Router } from 'express';
import {
  getAllSedes,
  getSedeById,
  createSede,
  updateSede,
  deleteSede,
  getAmbientesBySedeId,
  getAreasBySedeId,
} from '../controllers/sedes.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(56), createSede);
router.get('/', verifyToken, verifyPermiso(57), getAllSedes);
router.get('/:id', verifyToken, verifyPermiso(58), getSedeById);
router.put('/:id', verifyToken, verifyPermiso(59), updateSede);
router.delete('/:id', verifyToken, verifyPermiso(60), deleteSede);

router.get('/:id/ambientes', verifyToken, getAmbientesBySedeId);
router.get('/:id/areas', verifyToken, getAreasBySedeId);

export default { prefix: '/sedes', router };
