import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import propertiesRoutes from './routes/properties.js';
import swaggerRoutes from './swagger.js';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors()); // <--- THIS IS IMPORTANT

connectDB();

app.use('/users', usersRoutes);
app.use('/properties', propertiesRoutes);
app.use('/api-docs', swaggerRoutes);

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Real Estate Listing API is running');
});

export default app;
