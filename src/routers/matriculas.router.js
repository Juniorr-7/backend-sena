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

const router = Router()

router.get('/', getAllMatriculas)
router.get('/:id', getMatriculaById)
router.post('/', createMatricula)
router.put('/:id', updateMatricula)
router.delete('/:id', deleteMatricula)

router.get('/:id/curso', getCursoByMatriculaId)
router.get('/:id/persona', getPersonaByMatriculaId)

export default { prefix: "/matriculas", router }
