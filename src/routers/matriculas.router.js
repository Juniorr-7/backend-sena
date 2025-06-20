import { Router } from 'express'
import {
  getAllMatriculas,
  getMatriculaById,
  createMatricula,
  updateMatricula,
  deleteMatricula,
  getCursoByMatriculaId,
  getPersonaByMatriculaId
} from '../controllers/matriculas.controller.js'
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js'
import { verifyPermiso } from '../middlewares/permiso.middleware.js'

const router = Router()

router.post('/', verifyToken, verifyPermiso(46), createMatricula)
router.get('/', verifyToken, verifyPermiso(47), getAllMatriculas)
router.get('/:id', verifyToken, verifyPermiso(48), getMatriculaById)
router.put('/:id', verifyToken, verifyPermiso(49), updateMatricula)
router.delete('/:id', verifyToken, verifyPermiso(50), deleteMatricula)

router.get('/:id/curso', verifyToken, getCursoByMatriculaId)
router.get('/:id/persona', verifyToken, getPersonaByMatriculaId)

export default { prefix: "/matriculas", router }
