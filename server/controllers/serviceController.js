import { Service } from '../models/Service.js';

export const getPublicServices = async (req, res, next) => {
  try {
    const services = await Service.find({ published: true }).sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { title, slug, description, icon, benefits, startingPrice, order, published } = req.body;

    const serviceSlug = (slug || title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existing = await Service.findOne({ slug: serviceSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A service with this slug already exists.'
      });
    }

    const service = await Service.create({
      title,
      slug: serviceSlug,
      description,
      icon: icon || 'Code',
      benefits: Array.isArray(benefits) ? benefits : (typeof benefits === 'string' ? benefits.split('\n').map(b => b.trim()).filter(Boolean) : []),
      startingPrice: startingPrice || '',
      order: Number(order) || 0,
      published: published !== undefined ? Boolean(published) : true
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    let service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    const updates = { ...req.body };

    if (updates.slug && updates.slug !== service.slug) {
      updates.slug = updates.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await Service.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another service with this slug already exists.'
        });
      }
    }

    if (typeof updates.benefits === 'string') {
      updates.benefits = updates.benefits.split('\n').map(b => b.trim()).filter(Boolean);
    }

    service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: service,
      message: 'Service updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
