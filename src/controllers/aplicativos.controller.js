import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Obtener todos los aplicativos con paginación

const getAllAplicativos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [aplicativos, total] = await Promise.all([
      prisma.aplicativos.findMany({
        skip,
        take: limit,
        orderBy: { idAplicativo: 'asc' },
      }),
      prisma.aplicativos.count(),
    ]);

    res.json({
      data: aplicativos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los aplicativos' });
  }
};

// 2. Obtener un aplicativo por ID

const getAplicativoById = async (req, res) => {
  const { id } = req.params;

  try {
    const aplicativo = await prisma.aplicativos.findUnique({
      where: { idAplicativo: parseInt(id) },
    });

    if (!aplicativo) {
      return res.status(404).json({ error: 'Aplicativo no encontrado' });
    }

    res.json(aplicativo);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el aplicativo' });
  }
};

// 3. Crear un nuevo aplicativo

const createAplicativo = async (req, res) => {
  const { nombre } = req.body;

  try {
    if (!nombre || nombre.length > 50) {
      return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });
    }

    const nuevo = await prisma.aplicativos.create({
      data: { nombre },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el aplicativo' });
  }
};

// 4. Actualizar un aplicativo

const updateAplicativo = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || nombre.length > 50) return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });

  try {
    const existente = await prisma.aplicativos.findUnique({
      where: { idAplicativo: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Aplicativo no encontrado' });
    }

    const actualizado = await prisma.aplicativos.update({
      where: { idAplicativo: parseInt(id) },
      data: { nombre },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el aplicativo' });
  }
};

// 5. Eliminar un aplicativo

const deleteAplicativo = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.aplicativos.findUnique({
      where: { idAplicativo: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Aplicativo no encontrado' });
    }

    await prisma.aplicativos.delete({
      where: { idAplicativo: parseInt(id) },
    });

    res.json({ mensaje: 'Aplicativo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el aplicativo' });
  }
};

// 6. Obtener roles relacionados a un aplicativo

const getRolesByAplicativoId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const aplicativo = await prisma.aplicativos.findUnique({
      where: { idAplicativo: parseInt(id) },
      include: {
        roles: {
          skip,
          take: limit,
        },
      },
    });

    if (!aplicativo) {
      return res.status(404).json({ error: 'Aplicativo no encontrado' });
    }

    const total = await prisma.roles.count({
      where: { aplicativosId: parseInt(id) },
    });

    res.json({
      data: aplicativo.roles,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles del aplicativo' });
  }
};

// 7. Obtener usuarios relacionados a un aplicativo

const getUsuariosByAplicativoId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const aplicativo = await prisma.aplicativos.findUnique({
      where: { idAplicativo: parseInt(id) },
      include: {
        usuarios: {
          skip,
          take: limit,
        },
      },
    });

    if (!aplicativo) {
      return res.status(404).json({ error: 'Aplicativo no encontrado' });
    }

    const total = await prisma.usuarios.count({
      where: { aplicativosId: parseInt(id) },
    });

    res.json({
      data: aplicativo.usuarios,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios del aplicativo' });
  }
};

export { getAllAplicativos, getAplicativoById, createAplicativo, updateAplicativo, deleteAplicativo, getRolesByAplicativoId, getUsuariosByAplicativoId };