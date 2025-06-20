import { Router } from 'express';
import {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
  getPermisosByRutaId,
} from '../controllers/rutas.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(6), createRuta);
router.get('/', verifyToken, verifyPermiso(7), getAllRutas);
router.get('/:id', verifyToken, verifyPermiso(8), getRutaById);
router.put('/:id', verifyToken, verifyPermiso(9), updateRuta);
router.delete('/:id', verifyToken, verifyPermiso(10), deleteRuta);
router.get('/:id/permisos', verifyToken, getPermisosByRutaId);

export default { prefix: "/rutas", router };
