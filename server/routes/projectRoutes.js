import express from 'express';
import {
  getPublicProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicProjects);
router.get('/view/:slug', getProjectBySlug);

// Admin routes
router.get('/admin/all', requireAuth, getAllProjectsAdmin);
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
