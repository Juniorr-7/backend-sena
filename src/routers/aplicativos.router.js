import { Router } from 'express';
import {
  getAllAplicativos,
  getAplicativoById,
  createAplicativo,
  updateAplicativo,
  deleteAplicativo,
  getRolesByAplicativoId,
  getUsuariosByAplicativoId,
} from '../controllers/aplicativos.controller.js';

const router = Router();

// CRUD básico
router.get('/', getAllAplicativos);
router.get('/:id', getAplicativoById);
router.post('/', createAplicativo);
router.put('/:id', updateAplicativo);
router.delete('/:id', deleteAplicativo);

// Relaciones con paginación opcional
router.get('/:id/roles', getRolesByAplicativoId);
router.get('/:id/usuarios', getUsuariosByAplicativoId);

export default { prefix: "/aplicativos", router };
