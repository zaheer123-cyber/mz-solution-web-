import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
      default: ''
    },
    service: {
      type: String,
      required: [true, 'Service required is required'],
      trim: true
    },
    budget: {
      type: String,
      trim: true,
      default: '$1,000 - $5,000'
    },
    message: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
      maxlength: 5000
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed'],
      default: 'New',
      index: true
    },
    adminNotes: {
      type: String,
      default: '',
      trim: true
    },
    ipHash: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

inquirySchema.index({ status: 1, createdAt: -1 });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
