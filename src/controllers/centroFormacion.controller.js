import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllCentros = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [centros, total] = await Promise.all([
      prisma.centroFormacion.findMany({
        skip,
        take: limit,
        orderBy: { idCentro: 'asc' },
      }),
      prisma.centroFormacion.count(),
    ]);

    res.json({
      data: centros,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los centros de formación' });
  }
};

const getCentroById = async (req, res) => {
  const { id } = req.params;

  try {
    const centro = await prisma.centroFormacion.findUnique({
      where: { idCentro: parseInt(id) },
    });

    if (!centro) {
      return res.status(404).json({ error: 'Centro no encontrado' });
    }

    res.json(centro);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el centro' });
  }
};

const createCentro = async (req, res) => {
  const { nombre } = req.body;

  try {
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const nuevo = await prisma.centroFormacion.create({
      data: { nombre },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el centro de formación' });
  }
};

const updateCentro = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const existente = await prisma.centroFormacion.findUnique({
      where: { idCentro: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Centro no encontrado' });
    }

    const actualizado = await prisma.centroFormacion.update({
      where: { idCentro: parseInt(id) },
      data: { nombre },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el centro' });
  }
};

const deleteCentro = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.centroFormacion.findUnique({
      where: { idCentro: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Centro no encontrado' });
    }

    await prisma.centroFormacion.delete({
      where: { idCentro: parseInt(id) },
    });

    res.json({ mensaje: 'Centro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el centro' });
  }
};

const getSedesByCentroId = async (req, res) => {
  const { id } = req.params;

  try {
    const centro = await prisma.centroFormacion.findUnique({
      where: { idCentro: parseInt(id) },
      include: {
        sedes: true,
      },
    });

    if (!centro) {
      return res.status(404).json({ error: 'Centro no encontrado' });
    }

    res.json(centro.sedes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las sedes del centro' });
  }
};

export {
  getAllCentros,
  getCentroById,
  createCentro,
  updateCentro,
  deleteCentro,
  getSedesByCentroId,
};
