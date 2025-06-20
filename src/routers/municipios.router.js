import { Router } from 'express';
import {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from '../controllers/municipios.controller.js';
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js';

const router = Router();

router.get('/', verifyToken, getAllMunicipios);
router.get('/:id', verifyToken, getMunicipioById);
router.post('/', verifyToken, createMunicipio);
router.put('/:id', verifyToken, updateMunicipio);
router.delete('/:id', verifyToken, deleteMunicipio);

export default { prefix: "/municipios", router };
