import express from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contact.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { apiLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters')
];

const statusValidation = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['new', 'read', 'replied', 'archived']).withMessage('Invalid status')
];

// Public routes
router.post('/', apiLimiter, contactValidation, validate, createContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllContacts);
router.get('/stats', protect, authorize('admin'), getContactStats);
router.get('/:id', protect, authorize('admin'), getContactById);
router.put('/:id/status', protect, authorize('admin'), statusValidation, validate, updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
