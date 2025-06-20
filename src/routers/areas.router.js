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
import { verifyPermiso } from '../middlewares/permiso.middleware.js'

const router = Router()

router.post('/', verifyToken, verifyPermiso(36), createArea)
router.get('/', verifyToken, verifyPermiso(37), getAllAreas)
router.get('/:id', verifyToken, verifyPermiso(38), getAreaById)
router.put('/:id', verifyToken, verifyPermiso(39), updateArea)
router.delete('/:id', verifyToken, verifyPermiso(40), deleteArea)

router.get('/:id/sede', verifyToken, getSedeByAreaId)
router.get('/:id/cursos', verifyToken, getCursosByAreaId)

export default { prefix: "/areas", router }
