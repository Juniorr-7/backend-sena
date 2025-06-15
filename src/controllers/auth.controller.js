import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const login = async (req, res) => {

    const { login, password } = req.body;

    if( !login || !password ) return res.status(400).json({ error: 'Login y password son requeridos' });

    try{
        const usuario = await prisma.usuarios.findUnique({
            where: { login: login }
        });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        if (usuario.password !== password) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ sub: usuario.idUsuario, rol: usuario.idRol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });

        await prisma.accesos.create({
            data: {
                token,
                idUsuario: usuario.idUsuario,
                fechaIngreso: new Date(),
                fechaSalida: null,
                estado: "activo",
            }
        })

        res.status(200).json({ access_token: token });

    }
    catch(error){
        res.status(500).json({ error: 'Error iniciando sesión' });
    }
}

const logout = async (req, res) => {
    const token = req.header("authorization")?.split(" ")[1];
    try{
        await prisma.accesos.updateMany({
            where: {
                token: token
            },
            data: {
                fechaSalida: new Date(),
                estado: "inactivo"
            }
        })
        res.status(200).json({ message: 'Sesion cerrada' });
    }
    catch(error){
        res.status(500).json({ error: 'Error cerrando sesión' });
    }
}

export { login, logout };