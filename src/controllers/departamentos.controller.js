import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllDepartamentos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [departamentos, total] = await Promise.all([
      prisma.departamentos.findMany({
        skip,
        take: limit,
        orderBy: { idDepartamento: 'asc' },
      }),
      prisma.departamentos.count(),
    ]);

    res.json({
      data: departamentos,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los departamentos' });
  }
};

const getDepartamentoById = async (req, res) => {
  const { id } = req.params;

  try {
    const departamento = await prisma.departamentos.findUnique({
      where: { idDepartamento: parseInt(id) },
    });

    if (!departamento) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    res.json(departamento);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el departamento' });
  }
};

const createDepartamento = async (req, res) => {
  const { nombre } = req.body;

  try {
    if (!nombre || nombre.length > 50) {
      return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });
    }

    const nuevo = await prisma.departamentos.create({
      data: { nombre },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el departamento' });
  }
};

const updateDepartamento = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || nombre.length > 50) {
    return res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' });
  }

  try {
    const existente = await prisma.departamentos.findUnique({
      where: { idDepartamento: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    const actualizado = await prisma.departamentos.update({
      where: { idDepartamento: parseInt(id) },
      data: { nombre },
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el departamento' });
  }
};

const deleteDepartamento = async (req, res) => {
  const { id } = req.params;

  try {
    const existente = await prisma.departamentos.findUnique({
      where: { idDepartamento: parseInt(id) },
    });

    if (!existente) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    await prisma.departamentos.delete({
      where: { idDepartamento: parseInt(id) },
    });

    res.json({ mensaje: 'Departamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el departamento' });
  }
};

export {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};
