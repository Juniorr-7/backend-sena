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
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js'

const router = Router();

// CRUD básico
router.get('/', verifyToken, getAllAplicativos);
router.get('/:id', verifyToken, getAplicativoById);
router.post('/', verifyToken, createAplicativo);
router.put('/:id', verifyToken, updateAplicativo);
router.delete('/:id', verifyToken, deleteAplicativo);

// Relaciones
router.get('/:id/roles', verifyToken, getRolesByAplicativoId);
router.get('/:id/usuarios', verifyToken, getUsuariosByAplicativoId);

export default { prefix: "/aplicativos", router };
