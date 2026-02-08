// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

import connectDB from './config/db.js';
import usersRoutes from './routes/users.js';
import propertiesRoutes from './routes/properties.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors()); // Enable CORS for frontend & Swagger
app.use(express.json()); // Parse JSON bodies

// --- Swagger setup ---
const swaggerPath = path.join(process.cwd(), 'src', 'swagger', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

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
    process.exit(1);
  });
