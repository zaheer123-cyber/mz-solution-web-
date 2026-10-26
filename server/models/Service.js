import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: [true, 'Service slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true
    },
    icon: {
      type: String,
      default: 'Code',
      trim: true
    },
    benefits: {
      type: [String],
      default: []
    },
    startingPrice: {
      type: String,
      trim: true,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

serviceSchema.index({ published: 1, order: 1 });

export const Service = mongoose.model('Service', serviceSchema);
