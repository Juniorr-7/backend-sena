import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Obtener todos los módulos con paginación

const getAllModulos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [modulos, total] = await Promise.all([
      prisma.modulos.findMany({
        skip,
        take: limit,
        orderBy: { idModulo: 'asc' },
      }),
      prisma.modulos.count(),
    ]);

    res.json({
      data: modulos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los módulos' });
  }
};

// 2. Obtener un módulo por ID

const getModuloById = async (req, res) => {
  const { id } = req.params;

  try {
    const modulo = await prisma.modulos.findUnique({
      where: { idModulo: parseInt(id) },
    });

    if (!modulo) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    res.json(modulo);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el módulo' });
  }
};

// 3. Crear un nuevo módulo

const createModulo = async (req, res) => {
  const { modulo, idAplicativo } = req.body;

  try {
    if (!modulo || modulo.length > 50) {
      return res.status(400).json({ error: 'Nombre del módulo es requerido y debe tener máximo 50 caracteres' });
    }

    const nuevo = await prisma.modulos.create({
      data: { modulo, idAplicativo },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el módulo' });
  }
};

// 4. Actualizar un módulo

const updateModulo = async (req, res) => {
  const { id } = req.params;
  const { modulo, idAplicativo } = req.body;

  if (!modulo || modulo.length > 50) {
    return res.status(400).json({ error: 'Nombre del módulo es requerido y debe tener máximo 50 caracteres' });
  }

  try {
    const existente = await prisma.modulos.findUnique({
      where: { idModulo: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    const actualizado = await prisma.modulos.update({
      where: { idModulo: parseInt(id) },
      data: { modulo, idAplicativo },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el módulo' });
  }
};

// 5. Eliminar un módulo

const deleteModulo = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.modulos.findUnique({
      where: { idModulo: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    await prisma.modulos.delete({
      where: { idModulo: parseInt(id) },
    });

    res.json({ mensaje: 'Módulo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el módulo' });
  }
};

// 6. Obtener rutas relacionadas a un módulo

const getRutasByModuloId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const modulo = await prisma.modulos.findUnique({
      where: { idModulo: parseInt(id) },
      include: {
        rutas: {
          skip,
          take: limit,
        },
      },
    });

    if (!modulo) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    const total = await prisma.rutas.count({
      where: { idModulo: parseInt(id) },
    });

    res.json({
      data: modulo.rutas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutas del módulo' });
  }
};

export {
  getAllModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
  getRutasByModuloId
};
