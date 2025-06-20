import { Router } from 'express';
import {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from '../controllers/municipios.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';
import { verifyPermiso } from '../middlewares/permiso.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyPermiso(71), createMunicipio);
router.get('/', verifyToken, verifyPermiso(72), getAllMunicipios);
router.get('/:id', verifyToken, verifyPermiso(73), getMunicipioById);
router.put('/:id', verifyToken, verifyPermiso(74), updateMunicipio);
router.delete('/:id', verifyToken, verifyPermiso(75), deleteMunicipio);

export default { prefix: "/municipios", router };
