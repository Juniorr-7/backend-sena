import { Router } from 'express'
import {
  getAllCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  getMatriculasByCursoId
} from '../controllers/cursos.controller.js'
import { verifyToken } from '../middlewares/jsonwebtoken.middleware.js'

const router = Router()

router.get('/', verifyToken, getAllCursos)
router.get('/:id', verifyToken, getCursoById)
router.post('/', verifyToken, createCurso)
router.put('/:id', verifyToken, updateCurso)
router.delete('/:id', verifyToken, deleteCurso)

router.get('/:id/matriculas', verifyToken, getMatriculasByCursoId)

export default { prefix: "/cursos", router }
