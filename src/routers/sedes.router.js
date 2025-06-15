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

const router = Router();

router.get('/', getAllSedes);
router.get('/:id', getSedeById);
router.post('/', createSede);
router.put('/:id', updateSede);
router.delete('/:id', deleteSede);

router.get('/:id/ambientes', getAmbientesBySedeId);
router.get('/:id/areas', getAreasBySedeId);

export default { prefix: '/sedes', router };
