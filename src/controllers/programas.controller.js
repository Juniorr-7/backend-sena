import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllProgramas = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [programas, total] = await Promise.all([
      prisma.programas.findMany({
        skip,
        take: limit,
        orderBy: { idPrograma: 'asc' },
      }),
      prisma.programas.count(),
    ]);

    res.json({
      data: programas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los programas' });
  }
};

const getProgramaById = async (req, res) => {
  const { id } = req.params;

  try {
    const programa = await prisma.programas.findUnique({
      where: { idPrograma: parseInt(id) },
    });

    if (!programa) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }

    res.json(programa);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el programa' });
  }
};

const createPrograma = async (req, res) => {
  const { nombre, tipo } = req.body;

  try {
    if (!nombre || nombre.length > 50) {
      return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });
    }

    const nuevo = await prisma.programas.create({
      data: { nombre, tipo },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el programa' });
  }
};

const updatePrograma = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo } = req.body;

  if (!nombre || nombre.length > 50) return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });

  try {
    const existente = await prisma.programas.findUnique({
      where: { idPrograma: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }

    const actualizado = await prisma.programas.update({
      where: { idPrograma: parseInt(id) },
      data: { nombre, tipo },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el programa' });
  }
};

const deletePrograma = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.programas.findUnique({
      where: { idPrograma: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }

    await prisma.programas.delete({
      where: { idPrograma: parseInt(id) },
    });

    res.json({ mensaje: 'Programa eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el programa' });
  }
};

const getCursosByProgramaId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const programa = await prisma.programas.findUnique({
      where: { idPrograma: parseInt(id) },
      include: {
        cursos: {
          skip,
          take: limit,
        },
      },
    });

    if (!programa) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }

    const total = await prisma.cursos.count({
      where: { idPrograma: parseInt(id) },
    });

    res.json({
      data: programa.cursos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos del programa' });
  }
};

export {
  getAllProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma,
  getCursosByProgramaId,
};
