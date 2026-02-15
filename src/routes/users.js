import express from 'express';
import { body, validationResult } from 'express-validator';
import { isAuthenticated } from '../middleware/authenticate.js';// Import the OAuth check
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/usersController.js';

const router = express.Router();

// 1. Validation Logic for Users
const validateUser = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// GET routes (Public)
router.get('/', getUsers);
router.get('/:id', getUserById);

// POST/PUT/DELETE routes (Secured and Validated)
// isAuthenticated handles the OAuth requirement
// validateUser handles the Validation requirement
router.post('/', isAuthenticated, validateUser, createUser);
router.put('/:id', isAuthenticated, validateUser, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;