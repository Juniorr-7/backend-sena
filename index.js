import express from "express";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Importación dinámica de rutas
const routersPath = path.join(__dirname, 'src/routers');

fs.readdirSync(routersPath).forEach(async (file) => {
  if (file.endsWith('.js')) {
    const { default: router } = await import(path.join(routersPath, file));
    app.use(router);
  }
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});