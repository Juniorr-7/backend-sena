import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllSedes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [sedes, total] = await Promise.all([
      prisma.sedes.findMany({
        skip,
        take: limit,
        orderBy: { idSede: 'asc' },
      }),
      prisma.sedes.count(),
    ]);

    res.json({
      data: sedes,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las sedes' });
  }
};

const getSedeById = async (req, res) => {
  const { id } = req.params;

  try {
    const sede = await prisma.sedes.findUnique({
      where: { idSede: parseInt(id) },
    });

    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    res.json(sede);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la sede' });
  }
};

const createSede = async (req, res) => {
  const { nombre, idCentro } = req.body;

  try {
    if (!nombre || nombre.length > 50) {
      return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });
    }

    const nueva = await prisma.sedes.create({
      data: { nombre, idCentro },
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la sede' });
  }
};

const updateSede = async (req, res) => {
  const { id } = req.params;
  const { nombre, idCentro } = req.body;

  if (!nombre || nombre.length > 50) return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });

  try {
    const existente = await prisma.sedes.findUnique({
      where: { idSede: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    const actualizada = await prisma.sedes.update({
      where: { idSede: parseInt(id) },
      data: { nombre, idCentro },
    });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la sede' });
  }
};

const deleteSede = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.sedes.findUnique({
      where: { idSede: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    await prisma.sedes.delete({
      where: { idSede: parseInt(id) },
    });

    res.json({ mensaje: 'Sede eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la sede' });
  }
};

const getAmbientesBySedeId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const sede = await prisma.sedes.findUnique({
      where: { idSede: parseInt(id) },
      include: {
        ambientes: {
          skip,
          take: limit,
        },
      },
    });

    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    const total = await prisma.ambientes.count({
      where: { idSede: parseInt(id) },
    });

    res.json({
      data: sede.ambientes,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los ambientes de la sede' });
  }
};

const getAreasBySedeId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const sede = await prisma.sedes.findUnique({
      where: { idSede: parseInt(id) },
      include: {
        areas: {
          skip,
          take: limit,
        },
      },
    });

    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    const total = await prisma.areas.count({
      where: { idSede: parseInt(id) },
    });

    res.json({
      data: sede.areas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las áreas de la sede' });
  }
};

export {
  getAllSedes,
  getSedeById,
  createSede,
  updateSede,
  deleteSede,
  getAmbientesBySedeId,
  getAreasBySedeId,
};
