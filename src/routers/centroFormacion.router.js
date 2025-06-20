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
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(51), createCentro);
router.get('/', verifyToken, verifyPermiso(52), getAllCentros);
router.get('/:id', verifyToken, verifyPermiso(53), getCentroById);
router.put('/:id', verifyToken, verifyPermiso(54), updateCentro);
router.delete('/:id', verifyToken, verifyPermiso(55), deleteCentro);

router.get('/:id/sedes', verifyToken, getSedesByCentroId);

export default { prefix: "/centros", router };
