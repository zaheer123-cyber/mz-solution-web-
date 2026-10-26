import { Project } from '../models/Project.js';

export const getPublicProjects = async (req, res, next) => {
  try {
    const { category, search, limit = 50 } = req.query;
    const query = { published: true };

    if (category && category !== 'All Projects') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug: slug.toLowerCase(), published: true });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status === 'published') {
      query.published = true;
    } else if (status === 'draft') {
      query.published = false;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      description,
      category,
      technologies,
      image,
      galleryImages,
      liveUrl,
      githubUrl,
      clientName,
      featured,
      published,
      order
    } = req.body;

    const projectSlug = (slug || title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existing = await Project.findOne({ slug: projectSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A project with this slug already exists. Please choose a unique slug.'
      });
    }

    const project = await Project.create({
      title,
      slug: projectSlug,
      shortDescription: shortDescription || (description ? description.slice(0, 160) : ''),
      description,
      category: category || 'Web Apps',
      technologies: Array.isArray(technologies) ? technologies : (typeof technologies === 'string' ? technologies.split(',').map(s => s.trim()).filter(Boolean) : []),
      image: image || '',
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      clientName: clientName || '',
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      order: Number(order) || 0
    });

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    const updates = { ...req.body };

    if (updates.slug && updates.slug !== project.slug) {
      updates.slug = updates.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await Project.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another project with this slug already exists.'
        });
      }
    }

    if (typeof updates.technologies === 'string') {
      updates.technologies = updates.technologies.split(',').map(s => s.trim()).filter(Boolean);
    }

    project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
