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

const router = Router();

router.get('/', verifyToken, getAllSedes);
router.get('/:id', verifyToken, getSedeById);
router.post('/', verifyToken, createSede);
router.put('/:id', verifyToken, updateSede);
router.delete('/:id', verifyToken, deleteSede);

router.get('/:id/ambientes', verifyToken, getAmbientesBySedeId);
router.get('/:id/areas', verifyToken, getAreasBySedeId);

export default { prefix: '/sedes', router };
