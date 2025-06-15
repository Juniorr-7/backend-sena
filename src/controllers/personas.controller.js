import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllPersonas = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [personas, total] = await Promise.all([
      prisma.personas.findMany({
        skip,
        take: limit,
        orderBy: { idPersona: 'asc' },
      }),
      prisma.personas.count(),
    ]);

    res.json({
      data: personas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las personas' });
  }
};

const getPersonaById = async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await prisma.personas.findUnique({
      where: { idPersona: parseInt(id) },
    });

    if (!persona) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la persona' });
  }
};

const createPersona = async (req, res) => {
  const { nombre, telefono, direccion, correo, genero, idMunicipio, cargo, estado } = req.body;

  try {
    if (!nombre || !telefono || !direccion || !correo || !genero || !idMunicipio || !cargo) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }

    const nueva = await prisma.personas.create({
      data: {
        nombre,
        telefono,
        direccion,
        correo,
        genero,
        idMunicipio,
        cargo,
        estado: estado || 'activo',
      },
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la persona' });
  }
};

const updatePersona = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, direccion, correo, genero, idMunicipio, cargo, estado } = req.body;

  try {
    const existente = await prisma.personas.findUnique({
      where: { idPersona: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const actualizada = await prisma.personas.update({
      where: { idPersona: parseInt(id) },
      data: {
        nombre,
        telefono,
        direccion,
        correo,
        genero,
        idMunicipio,
        cargo,
        estado,
      },
    });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la persona' });
  }
};

const deletePersona = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.personas.findUnique({
      where: { idPersona: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    await prisma.personas.delete({
      where: { idPersona: parseInt(id) },
    });

    res.json({ mensaje: 'Persona eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la persona' });
  }
};

const getMatriculaByPersonaId = async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await prisma.personas.findUnique({
      where: { idPersona: parseInt(id) },
      include: {
        matricula: true,
      },
    });

    if (!persona) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json(persona.matricula);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la matrícula de la persona' });
  }
};

export {
  getAllPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
  getMatriculaByPersonaId,
};
