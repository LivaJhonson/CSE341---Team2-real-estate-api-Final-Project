import swaggerUi from 'swagger-ui-express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises'; // Import readFile

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load swagger.json using readFile (Reliable for Node 22)
const swaggerDocument = JSON.parse(
  await readFile(path.join(__dirname, 'swagger', 'swagger.json'), 'utf-8')
);

// Route for Swagger docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;