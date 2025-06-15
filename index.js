import express from "express";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import morgan from "morgan";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Importación dinámica de rutas
const routersPath = path.join(__dirname, 'src/routers');

fs.readdirSync(routersPath).forEach(async (file) => {
  if (file.endsWith('.js')) {
    const filePath = path.join(routersPath, file);
    const fileUrl = pathToFileURL(filePath);
    const { default: { router, prefix } } = await import(fileUrl.href);
    app.use('/api' + prefix, router);
  }
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});