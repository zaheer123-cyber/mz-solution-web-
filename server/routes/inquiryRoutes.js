import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createInquiry,
  getInquiriesAdmin,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  exportInquiriesCsv
} from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Rate limit for contact form submissions (5 submissions per 10 minutes)
const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many submissions from this connection. Please wait a few minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public submission
router.post('/', inquiryLimiter, createInquiry);

// Admin routes
router.get('/', requireAuth, getInquiriesAdmin);
router.get('/export', requireAuth, exportInquiriesCsv);
router.get('/:id', requireAuth, getInquiryById);
router.patch('/:id', requireAuth, updateInquiryStatus);
router.delete('/:id', requireAuth, deleteInquiry);

export default router;
