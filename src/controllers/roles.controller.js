import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Obtener todos los roles con paginación

const getAllRoles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [roles, total] = await Promise.all([
      prisma.roles.findMany({
        skip,
        take: limit,
        orderBy: { idRol: 'asc' },
      }),
      prisma.roles.count(),
    ]);

    res.json({
      data: roles,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// 2. Obtener un rol por ID

const getRolById = async (req, res) => {
  const { id } = req.params;

  try {
    const rol = await prisma.roles.findUnique({
      where: { idRol: parseInt(id) },
    });

    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el rol' });
  }
};

// 3. Crear un nuevo rol

const createRol = async (req, res) => {
  const { nombre, idAplicativo } = req.body;

  try {
    if (!nombre || nombre.length > 20) {
      return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 20 caracteres' });
    }

    const nuevo = await prisma.roles.create({
      data: { nombre, idAplicativo },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// 4. Actualizar un rol

const updateRol = async (req, res) => {
  const { id } = req.params;
  const { nombre, idAplicativo } = req.body;

  if (!nombre || nombre.length > 20) return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 20 caracteres' });

  try {
    const existente = await prisma.roles.findUnique({
      where: { idRol: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    const actualizado = await prisma.roles.update({
      where: { idRol: parseInt(id) },
      data: { nombre, idAplicativo },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// 5. Eliminar un rol

const deleteRol = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.roles.findUnique({
      where: { idRol: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    await prisma.roles.delete({
      where: { idRol: parseInt(id) },
    });

    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};

// 6. Obtener usuarios relacionados a un rol

const getUsuariosByRolId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const rol = await prisma.roles.findUnique({
      where: { idRol: parseInt(id) },
      include: {
        usuarios: {
          skip,
          take: limit,
        },
      },
    });

    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    const total = await prisma.usuarios.count({
      where: { idRol: parseInt(id) },
    });

    res.json({
      data: rol.usuarios,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios del rol' });
  }
};

export { getAllRoles, getRolById, createRol, updateRol, deleteRol, getUsuariosByRolId };
