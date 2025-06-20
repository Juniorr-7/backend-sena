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
import { verifyPermiso } from '../middlewares/permiso.middleware.js'

const router = Router()

router.post('/', verifyToken, verifyPermiso(61), createAmbiente)
router.get('/', verifyToken, verifyPermiso(62), getAllAmbientes)
router.get('/:id', verifyToken, verifyPermiso(63), getAmbienteById)
router.put('/:id', verifyToken, verifyPermiso(64), updateAmbiente)
router.delete('/:id', verifyToken, verifyPermiso(65), deleteAmbiente)

router.get('/:id/municipio', verifyToken, getMunicipioByAmbienteId)
router.get('/:id/sede', verifyToken, getSedeByAmbienteId)

export default { prefix: "/ambientes", router }
