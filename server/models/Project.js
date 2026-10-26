import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 120
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 250
    },
    description: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Web Apps'
    },
    technologies: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    galleryImages: {
      type: [String],
      default: []
    },
    liveUrl: {
      type: String,
      trim: true,
      default: ''
    },
    githubUrl: {
      type: String,
      trim: true,
      default: ''
    },
    clientName: {
      type: String,
      trim: true,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    published: {
      type: Boolean,
      default: true,
      index: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

projectSchema.index({ category: 1, published: 1, order: 1 });

export const Project = mongoose.model('Project', projectSchema);
