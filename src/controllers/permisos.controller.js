import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllPermisos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [permisos, total] = await Promise.all([
      prisma.permisos.findMany({
        skip,
        take: limit,
        orderBy: { idPermiso: 'asc' },
      }),
      prisma.permisos.count(),
    ]);

    res.json({
      data: permisos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los permisos' });
  }
};

const getPermisoById = async (req, res) => {
  const { id } = req.params;

  try {
    const permiso = await prisma.permisos.findUnique({
      where: { idPermiso: parseInt(id) },
    });

    if (!permiso) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }

    res.json(permiso);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el permiso' });
  }
};

const createPermiso = async (req, res) => {
  const { nombre, idRol, idRuta } = req.body;

  try {
    if (!nombre || nombre.length > 30 || !idRol || !idRuta) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevo = await prisma.permisos.create({
      data: { nombre, idRol, idRuta },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el permiso' });
  }
};

const updatePermiso = async (req, res) => {
  const { id } = req.params;
  const { nombre, idRol, idRuta } = req.body;

  if (!nombre || nombre.length > 30 || !idRol || !idRuta) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const existente = await prisma.permisos.findUnique({
      where: { idPermiso: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }

    const actualizado = await prisma.permisos.update({
      where: { idPermiso: parseInt(id) },
      data: { nombre, idRol, idRuta },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el permiso' });
  }
};

const deletePermiso = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.permisos.findUnique({
      where: { idPermiso: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }

    await prisma.permisos.delete({
      where: { idPermiso: parseInt(id) },
    });

    res.json({ mensaje: 'Permiso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el permiso' });
  }
};

export {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
};
