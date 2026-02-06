// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import connectDB from './config/db.js';
import usersRoutes from './routes/users.js';
import propertiesRoutes from './routes/properties.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors()); // Enable CORS for Swagger & frontend
app.use(express.json()); // Parse JSON bodies

// --- Swagger setup ---
const swaggerDocument = YAML.load(
  path.join(process.cwd(), 'src', 'swagger.yaml')
);

// Swagger docs available at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- API Routes ---
app.use('/users', usersRoutes);
app.use('/properties', propertiesRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Real Estate API is running. Visit /api-docs for documentation.');
});

// --- Connect to MongoDB and start server ---
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
