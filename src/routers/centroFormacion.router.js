import { Router } from 'express';
import {
  getAllCentros,
  getCentroById,
  createCentro,
  updateCentro,
  deleteCentro,
  getSedesByCentroId,
} from '../controllers/centroFormacion.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllCentros);
router.get('/:id', verifyToken, getCentroById);
router.post('/', verifyToken, createCentro);
router.put('/:id', verifyToken, updateCentro);
router.delete('/:id', verifyToken, deleteCentro);

router.get('/:id/sedes', verifyToken, getSedesByCentroId);

export default { prefix: "/centros", router };
