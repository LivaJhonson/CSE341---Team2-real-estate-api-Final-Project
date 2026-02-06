import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import express from 'express';
import path from 'path';

const router = express.Router();

// Load swagger.yaml using absolute path
const swaggerDocument = YAML.load(path.join(process.cwd(), 'src', 'swagger.yaml'));

// Route for Swagger docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
