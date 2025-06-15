import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllMunicipios = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [municipios, total] = await Promise.all([
      prisma.municipios.findMany({
        skip,
        take: limit,
        orderBy: { idMunicipio: 'asc' },
      }),
      prisma.municipios.count(),
    ]);

    res.json({
      data: municipios,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los municipios' });
  }
};

const getMunicipioById = async (req, res) => {
  const { id } = req.params;

  try {
    const municipio = await prisma.municipios.findUnique({
      where: { idMunicipio: parseInt(id) },
    });

    if (!municipio) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    res.json(municipio);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el municipio' });
  }
};

const createMunicipio = async (req, res) => {
  const { nombre, idDepartamento } = req.body;

  try {
    if (!nombre || nombre.length > 50 || !idDepartamento) {
      return res.status(400).json({ error: 'Nombre e idDepartamento son requeridos y nombre debe tener máximo 50 caracteres' });
    }

    const nuevo = await prisma.municipios.create({
      data: {
        nombre,
        idDepartamento,
      },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el municipio' });
  }
};

const updateMunicipio = async (req, res) => {
  const { id } = req.params;
  const { nombre, idDepartamento } = req.body;

  if (!nombre || nombre.length > 50 || !idDepartamento) {
    return res.status(400).json({ error: 'Nombre e idDepartamento son requeridos y nombre debe tener máximo 50 caracteres' });
  }

  try {
    const existente = await prisma.municipios.findUnique({
      where: { idMunicipio: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    const actualizado = await prisma.municipios.update({
      where: { idMunicipio: parseInt(id) },
      data: { nombre, idDepartamento },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el municipio' });
  }
};

const deleteMunicipio = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.municipios.findUnique({
      where: { idMunicipio: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    await prisma.municipios.delete({
      where: { idMunicipio: parseInt(id) },
    });

    res.json({ mensaje: 'Municipio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el municipio' });
  }
};

export {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
};
