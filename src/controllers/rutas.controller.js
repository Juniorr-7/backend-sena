import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllRutas = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [rutas, total] = await Promise.all([
      prisma.rutas.findMany({
        skip,
        take: limit,
        orderBy: { idRuta: 'asc' },
      }),
      prisma.rutas.count(),
    ]);

    res.json({
      data: rutas,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutas' });
  }
};

const getRutaById = async (req, res) => {
  const { id } = req.params;

  try {
    const ruta = await prisma.rutas.findUnique({
      where: { idRuta: parseInt(id) },
    });

    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.json(ruta);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la ruta' });
  }
};

const createRuta = async (req, res) => {
  const { nombre, url, idModulo } = req.body;

  try {
    if (!nombre || nombre.length > 50 || !url || url.length > 100 || !idModulo) {
      return res.status(400).json({ error: 'Nombre y URL son requeridos con sus respectivos límites' });
    }

    const nueva = await prisma.rutas.create({
      data: { nombre, url, idModulo },
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ruta' });
  }
};

const updateRuta = async (req, res) => {
  const { id } = req.params;
  const { nombre, url, idModulo } = req.body;

  if (!nombre || nombre.length > 50 || !url || url.length > 100 || !idModulo) {
    return res.status(400).json({ error: 'Nombre y URL son requeridos con sus respectivos límites' });
  }

  try {
    const existente = await prisma.rutas.findUnique({
      where: { idRuta: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    const actualizada = await prisma.rutas.update({
      where: { idRuta: parseInt(id) },
      data: { nombre, url, idModulo },
    });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ruta' });
  }
};

const deleteRuta = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.rutas.findUnique({
      where: { idRuta: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    await prisma.rutas.delete({
      where: { idRuta: parseInt(id) },
    });

    res.json({ mensaje: 'Ruta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la ruta' });
  }
};

const getPermisosByRutaId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const ruta = await prisma.rutas.findUnique({
      where: { idRuta: parseInt(id) },
      include: {
        permisos: {
          skip,
          take: limit,
        },
      },
    });

    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    const total = await prisma.permisos.count({
      where: { idRuta: parseInt(id) },
    });

    res.json({
      data: ruta.permisos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los permisos de la ruta' });
  }
};

export {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
  getPermisosByRutaId,
};
