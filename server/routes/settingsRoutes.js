import express from 'express';
import { getPublicSettings, getAdminSettings, updateSettings } from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public website settings
router.get('/public', getPublicSettings);

// Admin settings
router.get('/', requireAuth, getAdminSettings);
router.put('/', requireAuth, updateSettings);

export default router;
