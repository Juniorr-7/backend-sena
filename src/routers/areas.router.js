import { Router } from 'express'
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
  getSedeByAreaId,
  getCursosByAreaId
} from '../controllers/areas.controller.js'

const router = Router()

router.get('/', getAllAreas)
router.get('/:id', getAreaById)
router.post('/', createArea)
router.put('/:id', updateArea)
router.delete('/:id', deleteArea)

router.get('/:id/sede', getSedeByAreaId)
router.get('/:id/cursos', getCursosByAreaId)

export default { prefix: "/areas", router }
