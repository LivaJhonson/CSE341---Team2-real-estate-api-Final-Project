import swaggerUi from 'swagger-ui-express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load swagger.json using absolute path
const swaggerDocument = await import(
  path.join(__dirname, 'swagger', 'swagger.json'),
  { assert: { type: 'json' } }
);

// Route for Swagger docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument.default));

export default router;
