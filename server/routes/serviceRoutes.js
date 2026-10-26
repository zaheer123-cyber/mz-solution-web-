import express from 'express';
import {
  getPublicServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicServices);

// Admin routes
router.get('/admin/all', requireAuth, getAllServicesAdmin);
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;
