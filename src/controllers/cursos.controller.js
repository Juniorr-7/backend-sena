import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllCursos = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const [cursos, total] = await Promise.all([
      prisma.cursos.findMany({
        skip,
        take: limit,
        orderBy: { idCurso: 'asc' },
      }),
      prisma.cursos.count(),
    ])

    res.json({
      data: cursos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos' })
  }
}

const getCursoById = async (req, res) => {
  const { id } = req.params

  try {
    const curso = await prisma.cursos.findUnique({
      where: { idCurso: parseInt(id) },
    })

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    res.json(curso)
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el curso' })
  }
}

const createCurso = async (req, res) => {
  const { codigo, fechaInicio, fechaFin, finLectiva, idArea, idPrograma, idPersona } = req.body

  if (!codigo || !fechaInicio || !fechaFin || !finLectiva || !idArea || !idPrograma || !idPersona) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' })
  }

  try {
    const nuevo = await prisma.cursos.create({
      data: { codigo, fechaInicio: new Date(fechaInicio), fechaFin: new Date(fechaFin), finLectiva: new Date(finLectiva), idArea, idPrograma, idPersona },
    })

    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso' })
  }
}

const updateCurso = async (req, res) => {
  const { id } = req.params
  const { codigo, fechaInicio, fechaFin, finLectiva, idArea, idPrograma, idPersona } = req.body

  if (!codigo || !fechaInicio || !fechaFin || !finLectiva || !idArea || !idPrograma || !idPersona) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' })
  }

  try {
    const existente = await prisma.cursos.findUnique({
      where: { idCurso: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    const actualizado = await prisma.cursos.update({
      where: { idCurso: parseInt(id) },
      data: { codigo, fechaInicio: new Date(fechaInicio), fechaFin: new Date(fechaFin), finLectiva: new Date(finLectiva), idArea, idPrograma, idPersona },
    })

    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' })
  }
}

const deleteCurso = async (req, res) => {
  const { id } = req.params

  try {
    const existente = await prisma.cursos.findUnique({
      where: { idCurso: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    await prisma.cursos.delete({
      where: { idCurso: parseInt(id) },
    })

    res.json({ mensaje: 'Curso eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' })
  }
}

const getMatriculasByCursoId = async (req, res) => {
  const { id } = req.params
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const curso = await prisma.cursos.findUnique({
      where: { idCurso: parseInt(id) },
      include: {
        matriculas: {
          skip,
          take: limit,
        },
      },
    })

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    const total = await prisma.matriculas.count({
      where: { idCurso: parseInt(id) },
    })

    res.json({
      data: curso.matriculas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las matrículas del curso' })
  }
}

export {
  getAllCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  getMatriculasByCursoId
}
