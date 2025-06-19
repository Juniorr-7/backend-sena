import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllMatriculas = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const [matriculas, total] = await Promise.all([
      prisma.matriculas.findMany({
        skip,
        take: limit,
        orderBy: { idMatricula: 'asc' },
      }),
      prisma.matriculas.count(),
    ])

    res.json({
      data: matriculas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las matrículas' })
  }
}

const getMatriculaById = async (req, res) => {
  const { id } = req.params

  try {
    const matricula = await prisma.matriculas.findUnique({
      where: { idMatricula: parseInt(id) },
    })

    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula no encontrada' })
    }

    res.json(matricula)
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la matrícula' })
  }
}

const createMatricula = async (req, res) => {
  const { idPersona, idCurso } = req.body

  try {

    const existing = await prisma.matriculas.findUnique({
        where: {
            idPersona
        }
    })

    if(existing) return res.status(400).json({ error: 'Ya existe una matricula para esta persona' })

    const nueva = await prisma.matriculas.create({
      data: { idPersona, idCurso },
    })

    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la matrícula' })
  }
}

const updateMatricula = async (req, res) => {
  const { id } = req.params
  const { idPersona, idCurso } = req.body

  try {
    const existente = await prisma.matriculas.findUnique({
      where: { idMatricula: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Matrícula no encontrada' })
    }

    const actualizada = await prisma.matriculas.update({
      where: { idMatricula: parseInt(id) },
      data: { idPersona, idCurso },
    })

    res.json(actualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la matrícula' })
  }
}

const deleteMatricula = async (req, res) => {
  const { id } = req.params

  try {
    const existente = await prisma.matriculas.findUnique({
      where: { idMatricula: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Matrícula no encontrada' })
    }

    await prisma.matriculas.delete({
      where: { idMatricula: parseInt(id) },
    })

    res.json({ mensaje: 'Matrícula eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la matrícula' })
  }
}

const getCursoByMatriculaId = async (req, res) => {
  const { id } = req.params

  try {
    const matricula = await prisma.matriculas.findUnique({
      where: { idMatricula: parseInt(id) },
      include: { curso: true },
    })

    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula no encontrada' })
    }

    res.json(matricula.curso)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso de la matrícula' })
  }
}

const getPersonaByMatriculaId = async (req, res) => {
  const { id } = req.params

  try {
    const matricula = await prisma.matriculas.findUnique({
      where: { idMatricula: parseInt(id) },
      include: { persona: true },
    })

    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula no encontrada' })
    }

    res.json(matricula.persona)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la persona de la matrícula' })
  }
}

export {
  getAllMatriculas,
  getMatriculaById,
  createMatricula,
  updateMatricula,
  deleteMatricula,
  getCursoByMatriculaId,
  getPersonaByMatriculaId
}
