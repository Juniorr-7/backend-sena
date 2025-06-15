import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
    try{
        const token = req.header("authorization")?.split(" ")[1];
        if(!token) return res.status(401).json({ error: 'No se ha logueado' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({ error: 'No autorizado' });
    }
}

export { verifyToken };