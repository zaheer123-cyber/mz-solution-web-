import express from 'express';
import { trackEvent, getAnalyticsOverview } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public event collection
router.post('/events', trackEvent);

// Admin analytics dashboard
router.get('/overview', requireAuth, getAnalyticsOverview);

export default router;
