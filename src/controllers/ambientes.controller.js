import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllAmbientes = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const [ambientes, total] = await Promise.all([
      prisma.ambientes.findMany({
        skip,
        take: limit,
        orderBy: { idAmbiente: 'asc' },
      }),
      prisma.ambientes.count(),
    ])

    res.json({
      data: ambientes,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los ambientes' })
  }
}

const getAmbienteById = async (req, res) => {
  const { id } = req.params

  try {
    const ambiente = await prisma.ambientes.findUnique({
      where: { idAmbiente: parseInt(id) },
    })

    if (!ambiente) {
      return res.status(404).json({ error: 'Ambiente no encontrado' })
    }

    res.json(ambiente)
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el ambiente' })
  }
}

const createAmbiente = async (req, res) => {
  const { nombre, idMunicipio, idSede } = req.body

  try {
    const nuevo = await prisma.ambientes.create({
      data: { nombre, idMunicipio, idSede },
    })

    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ambiente' })
  }
}

const updateAmbiente = async (req, res) => {
  const { id } = req.params
  const { nombre, idMunicipio, idSede } = req.body

  try {
    const existente = await prisma.ambientes.findUnique({
      where: { idAmbiente: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Ambiente no encontrado' })
    }

    const actualizado = await prisma.ambientes.update({
      where: { idAmbiente: parseInt(id) },
      data: { nombre, idMunicipio, idSede },
    })

    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ambiente' })
  }
}

const deleteAmbiente = async (req, res) => {
  const { id } = req.params

  try {
    const existente = await prisma.ambientes.findUnique({
      where: { idAmbiente: parseInt(id) },
    })

    if (!existente) {
      return res.status(404).json({ error: 'Ambiente no encontrado' })
    }

    await prisma.ambientes.delete({
      where: { idAmbiente: parseInt(id) },
    })

    res.json({ mensaje: 'Ambiente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ambiente' })
  }
}

const getMunicipioByAmbienteId = async (req, res) => {
  const { id } = req.params

  try {
    const ambiente = await prisma.ambientes.findUnique({
      where: { idAmbiente: parseInt(id) },
      include: { municipio: true },
    })

    if (!ambiente) {
      return res.status(404).json({ error: 'Ambiente no encontrado' })
    }

    res.json(ambiente.municipio)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el municipio del ambiente' })
  }
}

const getSedeByAmbienteId = async (req, res) => {
  const { id } = req.params

  try {
    const ambiente = await prisma.ambientes.findUnique({
      where: { idAmbiente: parseInt(id) },
      include: { sede: true },
    })

    if (!ambiente) {
      return res.status(404).json({ error: 'Ambiente no encontrado' })
    }

    res.json(ambiente.sede)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la sede del ambiente' })
  }
}

export {
  getAllAmbientes,
  getAmbienteById,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente,
  getMunicipioByAmbienteId,
  getSedeByAmbienteId
}
