import { Router } from 'express'
import {
  getAllAmbientes,
  getAmbienteById,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente,
  getMunicipioByAmbienteId,
  getSedeByAmbienteId
} from '../controllers/ambientes.controller.js'
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js'

const router = Router()

router.get('/', verifyToken, getAllAmbientes)
router.get('/:id', verifyToken, getAmbienteById)
router.post('/', verifyToken, createAmbiente)
router.put('/:id', verifyToken, updateAmbiente)
router.delete('/:id', verifyToken, deleteAmbiente)

router.get('/:id/municipio', verifyToken, getMunicipioByAmbienteId)
router.get('/:id/sede', verifyToken, getSedeByAmbienteId)

export default { prefix: "/ambientes", router }
