import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: ['pageview', 'cta_click', 'form_submit'],
      default: 'pageview',
      index: true
    },
    path: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    referrer: {
      type: String,
      default: '',
      trim: true
    },
    referrerSource: {
      type: String,
      enum: ['Direct', 'Organic Search', 'Social Media', 'Referral'],
      default: 'Direct',
      index: true
    },
    sessionId: {
      type: String,
      index: true
    },
    visitorHash: {
      type: String,
      index: true
    },
    metadata: {
      type: Map,
      of: String,
      default: {}
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

analyticsEventSchema.index({ createdAt: 1, eventType: 1 });
analyticsEventSchema.index({ createdAt: -1, referrerSource: 1 });

export const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);
