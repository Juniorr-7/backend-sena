import { Router } from 'express';
import {
  getAllCentros,
  getCentroById,
  createCentro,
  updateCentro,
  deleteCentro,
  getSedesByCentroId,
} from '../controllers/centroFormacion.controller.js';

const router = Router();

router.get('/', getAllCentros);
router.get('/:id', getCentroById);
router.post('/', createCentro);
router.put('/:id', updateCentro);
router.delete('/:id', deleteCentro);

router.get('/:id/sedes', getSedesByCentroId);

export default { prefix: "/centros", router };
