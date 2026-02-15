import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

// Validation rules for all collections
export const rules = {
  property: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('location').notEmpty().withMessage('Location is required'),
    body('agentId').isMongoId().withMessage('Invalid Agent ID')
  ],
  user: [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 chars'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  inquiry: [
    body('propertyId').isMongoId().withMessage('Invalid Property ID'),
    body('userId').isMongoId().withMessage('Invalid User ID'),
    body('message').trim().notEmpty().withMessage('Message cannot be empty')
  ]
};