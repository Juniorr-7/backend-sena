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

const router = Router();

router.get('/', verifyToken, getAllRutas);
router.get('/:id', verifyToken, getRutaById);
router.post('/', verifyToken, createRuta);
router.put('/:id', verifyToken, updateRuta);
router.delete('/:id', verifyToken, deleteRuta);
router.get('/:id/permisos', verifyToken, getPermisosByRutaId);

export default { prefix: "/rutas", router };
