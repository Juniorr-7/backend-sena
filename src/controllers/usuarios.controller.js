import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Obtener todos los usuarios con paginación

const getAllUsuarios = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [usuarios, total] = await Promise.all([
      prisma.usuarios.findMany({
        skip,
        take: limit,
        orderBy: { idUsuario: 'asc' },
      }),
      prisma.usuarios.count(),
    ]);

    res.json({
      data: usuarios,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// 2. Obtener un usuario por ID

const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { idUsuario: parseInt(id) },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

// 3. Crear un nuevo usuario

const createUsuario = async (req, res) => {
  const { login, password, idPersona, idAplicativo, idRol } = req.body;

  try {
    if (!login || login.length > 30 || !password || password.length > 20 || !idPersona) {
      return res.status(400).json({ error: 'Login y password son requeridos con longitudes válidas' });
    }

    const nuevo = await prisma.usuarios.create({
      data: { login, password, idPersona, idAplicativo, idRol },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// 4. Actualizar un usuario

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { login, password, idPersona, idAplicativo, idRol } = req.body;

  if (!login || login.length > 30 || !password || password.length > 20, idPersona) {
    return res.status(400).json({ error: 'Login y password son requeridos con longitudes válidas' });
  }

  try {
    const existente = await prisma.usuarios.findUnique({
      where: { idUsuario: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const actualizado = await prisma.usuarios.update({
      where: { idUsuario: parseInt(id) },
      data: { login, password, idPersona, idAplicativo, idRol },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// 5. Eliminar un usuario

const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.usuarios.findUnique({
      where: { idUsuario: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await prisma.usuarios.delete({
      where: { idUsuario: parseInt(id) },
    });

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };
