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

const router = Router()

router.get('/', verifyToken, getAllMatriculas)
router.get('/:id', verifyToken, getMatriculaById)
router.post('/', verifyToken, createMatricula)
router.put('/:id', verifyToken, updateMatricula)
router.delete('/:id', verifyToken, deleteMatricula)

router.get('/:id/curso', verifyToken, getCursoByMatriculaId)
router.get('/:id/persona', verifyToken, getPersonaByMatriculaId)

export default { prefix: "/matriculas", router }
