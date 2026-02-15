import express from 'express';
import { body, validationResult } from 'express-validator';
import { isAuthenticated } from '../app.js'; 
import {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry
} from '../controllers/inquiriesController.js';

const router = express.Router();

// Validation Rules for Inquiries
const validateInquiry = [
  body('propertyId').isMongoId().withMessage('A valid Property ID is required'),
  body('userId').isMongoId().withMessage('A valid User ID is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// GET routes (Public)
router.get('/', getInquiries);
router.get('/:id', getInquiryById);

// POST (Public so customers can send inquiries, but Validated)
router.post('/', validateInquiry, createInquiry);

// PUT and DELETE (Secured and Validated)
router.put('/:id', isAuthenticated, validateInquiry, updateInquiry);
router.delete('/:id', isAuthenticated, deleteInquiry);

export default router;