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
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js'

const router = Router()

router.get('/', verifyToken, getAllAreas)
router.get('/:id', verifyToken, getAreaById)
router.post('/', verifyToken, createArea)
router.put('/:id', verifyToken, updateArea)
router.delete('/:id', verifyToken, deleteArea)

router.get('/:id/sede', verifyToken, getSedeByAreaId)
router.get('/:id/cursos', verifyToken, getCursosByAreaId)

export default { prefix: "/areas", router }
