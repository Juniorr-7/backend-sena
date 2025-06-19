import { Router } from 'express'
import {
  getAllCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  getMatriculasByCursoId
} from '../controllers/cursos.controller.js'

const router = Router()

router.get('/', getAllCursos)
router.get('/:id', getCursoById)
router.post('/', createCurso)
router.put('/:id', updateCurso)
router.delete('/:id', deleteCurso)

router.get('/:id/matriculas', getMatriculasByCursoId)

export default { prefix: "/cursos", router }
