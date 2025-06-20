import { Router } from 'express';
import {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '../controllers/departamentos.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(66), createDepartamento);
router.get('/', verifyToken, verifyPermiso(67), getAllDepartamentos);
router.get('/:id', verifyToken, verifyPermiso(68), getDepartamentoById);
router.put('/:id', verifyToken, verifyPermiso(69), updateDepartamento);
router.delete('/:id', verifyToken, verifyPermiso(70), deleteDepartamento);

export default { prefix: "/departamentos", router };
