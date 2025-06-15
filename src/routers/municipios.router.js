import { Router } from 'express';
import {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from '../controllers/municipios.controller.js';

const router = Router();

router.get('/', getAllMunicipios);
router.get('/:id', getMunicipioById);
router.post('/', createMunicipio);
router.put('/:id', updateMunicipio);
router.delete('/:id', deleteMunicipio);

export default { prefix: "/municipios", router };
