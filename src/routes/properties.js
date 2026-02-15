import express from 'express';
import { body, validationResult } from 'express-validator';
import { isAuthenticated } from '../app.js'; // Import the security check
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertiesController.js';

const router = express.Router();

// Validation Rules logic
const validateProperty = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location').notEmpty().withMessage('Location is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// GET routes remain public
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// POST/PUT/DELETE now require authentication (isAuthenticated)
// POST/PUT also require data validation (validateProperty)
router.post('/', isAuthenticated, validateProperty, createProperty);
router.put('/:id', isAuthenticated, validateProperty, updateProperty);
router.delete('/:id', isAuthenticated, deleteProperty);

export default router;