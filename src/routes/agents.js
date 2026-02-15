import express from 'express';
import { body, validationResult } from 'express-validator';
import { isAuthenticated } from '../app.js';
import {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent
} from '../controllers/agentsController.js';

const router = express.Router();

const validateAgent = [
  body('name').trim().notEmpty().withMessage('Agent name is required'),
  body('email').isEmail().withMessage('Valid agent email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.get('/', getAgents);
router.get('/:id', getAgentById);

// Secured and Validated
router.post('/', isAuthenticated, validateAgent, createAgent);
router.put('/:id', isAuthenticated, validateAgent, updateAgent);
router.delete('/:id', isAuthenticated, deleteAgent);

export default router;