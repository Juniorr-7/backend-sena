import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const verifyPermiso = ( idPermiso ) => async (req, res, next) => {
    try{
        const userRol = req.user.rol;
        const { idRol } = await prisma.permisos.findUnique({
            where: {
                idPermiso
            },
            select: {
                idRol: true
            }
        })
        if(userRol !== idRol) return res.status(403).json({ error: 'No autorizado' })
        next();
    }
    catch(error){
        res.status(403).json({ error: 'No autorizado' });
    }
}

export { verifyPermiso };