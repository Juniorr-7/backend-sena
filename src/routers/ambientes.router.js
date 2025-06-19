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

const router = Router()

router.get('/', getAllAmbientes)
router.get('/:id', getAmbienteById)
router.post('/', createAmbiente)
router.put('/:id', updateAmbiente)
router.delete('/:id', deleteAmbiente)

router.get('/:id/municipio', getMunicipioByAmbienteId)
router.get('/:id/sede', getSedeByAmbienteId)

export default { prefix: "/ambientes", router }
