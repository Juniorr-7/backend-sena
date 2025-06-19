import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllAreas = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const [areas, total] = await Promise.all([
      prisma.areas.findMany({
        skip,
        take: limit,
        orderBy: { idArea: 'asc' },
      }),
      prisma.areas.count(),
    ])

    res.json({
      data: areas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las áreas' })
  }
}

const getAreaById = async (req, res) => {
  const { id } = req.params

  try {
    const area = await prisma.areas.findUnique({
      where: { idArea: parseInt(id) },
    })

    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada' })
    }

    res.json(area)
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el área' })
  }
}

const createArea = async (req, res) => {
  const { nombre, idSede } = req.body

  const existingSede = await prisma.sedes.findUnique({
    where: {
        idSede
    }
  })

  if(!existingSede) return res.status(404).json({ error: 'No existe la sede' })

  try {
    const nueva = await prisma.areas.create({
      data: { nombre, idSede },
    })

    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el área' })
  }
}

const updateArea = async (req, res) => {
  const { id } = req.params
  const { nombre, idSede } = req.body

  try {
    const existente = await prisma.areas.findUnique({
      where: { idArea: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Área no encontrada' })
    }

    const actualizada = await prisma.areas.update({
      where: { idArea: parseInt(id) },
      data: { nombre, idSede },
    })

    res.json(actualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el área' })
  }
}

const deleteArea = async (req, res) => {
  const { id } = req.params

  try {
    const existente = await prisma.areas.findUnique({
      where: { idArea: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Área no encontrada' })
    }

    await prisma.areas.delete({
      where: { idArea: parseInt(id) },
    })

    res.json({ mensaje: 'Área eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el área' })
  }
}

const getSedeByAreaId = async (req, res) => {
  const { id } = req.params

  try {
    const area = await prisma.areas.findUnique({
      where: { idArea: parseInt(id) },
      include: { sede: true },
    })

    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada' })
    }

    res.json(area.sede)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la sede del área' })
  }
}

const getCursosByAreaId = async (req, res) => {
  const { id } = req.params
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const area = await prisma.areas.findUnique({
      where: { idArea: parseInt(id) },
      include: {
        cursos: {
          skip,
          take: limit,
        },
      },
    })

    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada' })
    }

    const total = await prisma.cursos.count({
      where: { idArea: parseInt(id) },
    })

    res.json({
      data: area.cursos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos del área' })
  }
}

export {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
  getSedeByAreaId,
  getCursosByAreaId
}
