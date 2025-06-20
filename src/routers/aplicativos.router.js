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
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

// CRUD básico
router.post('/', verifyToken, verifyPermiso(76), createAplicativo);
router.get('/', verifyToken, verifyPermiso(77), getAllAplicativos);
router.get('/:id', verifyToken, verifyPermiso(78), getAplicativoById);
router.put('/:id', verifyToken, verifyPermiso(79), updateAplicativo);
router.delete('/:id', verifyToken, verifyPermiso(80), deleteAplicativo);

// Relaciones
router.get('/:id/roles', verifyToken, getRolesByAplicativoId);
router.get('/:id/usuarios', verifyToken, getUsuariosByAplicativoId);

export default { prefix: "/aplicativos", router };
