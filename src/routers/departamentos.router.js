import { Router } from 'express';
import {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '../controllers/departamentos.controller.js';

const router = Router();

router.get('/', getAllDepartamentos);
router.get('/:id', getDepartamentoById);
router.post('/', createDepartamento);
router.put('/:id', updateDepartamento);
router.delete('/:id', deleteDepartamento);

export default { prefix: "/departamentos", router };
