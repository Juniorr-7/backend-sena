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
import { verifyPermiso } from '../middlewares/permiso.middleware.js'

const router = Router()

router.post('/', verifyToken, verifyPermiso(41), createCurso)
router.get('/', verifyToken, verifyPermiso(42), getAllCursos)
router.get('/:id', verifyToken, verifyPermiso(43), getCursoById)
router.put('/:id', verifyToken, verifyPermiso(44), updateCurso)
router.delete('/:id', verifyToken, verifyPermiso(45), deleteCurso)

router.get('/:id/matriculas', verifyToken, getMatriculasByCursoId)

export default { prefix: "/cursos", router }
