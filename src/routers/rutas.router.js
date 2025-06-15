import { Router } from 'express';
import {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
  getPermisosByRutaId,
} from '../controllers/rutas.controller.js';

const router = Router();

router.get('/', getAllRutas);
router.get('/:id', getRutaById);
router.post('/', createRuta);
router.put('/:id', updateRuta);
router.delete('/:id', deleteRuta);
router.get('/:id/permisos', getPermisosByRutaId);

export default { prefix: "/rutas", router };
