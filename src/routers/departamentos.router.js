import { Router } from 'express';
import {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '../controllers/departamentos.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllDepartamentos);
router.get('/:id', verifyToken, getDepartamentoById);
router.post('/', verifyToken, createDepartamento);
router.put('/:id', verifyToken, updateDepartamento);
router.delete('/:id', verifyToken, deleteDepartamento);

export default { prefix: "/departamentos", router };
