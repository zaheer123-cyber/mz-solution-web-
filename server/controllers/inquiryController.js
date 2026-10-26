import { Inquiry } from '../models/Inquiry.js';
import { sendInquiryNotification } from '../services/emailService.js';
import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import crypto from 'crypto';

export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, company, service, budget, message, honeypot } = req.body;

    // Spam honeypot check
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been received. Our team will contact you shortly.'
      });
    }

    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Name, Email, Service, and Message).'
      });
    }

    // Hash IP for privacy-conscious abuse prevention
    const ip = req.ip || req.connection.remoteAddress || '';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      service: service.trim(),
      budget: (budget || '$1,000 - $5,000').trim(),
      message: message.trim(),
      status: 'New',
      ipHash
    });

    // Asynchronously send email notification
    sendInquiryNotification(inquiry);

    // Track analytics event
    try {
      await AnalyticsEvent.create({
        eventType: 'form_submit',
        path: '/contact',
        referrerSource: 'Direct',
        metadata: {
          service: inquiry.service,
          budget: inquiry.budget
        }
      });
    } catch (e) {
      // Non-fatal if analytics fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been sent successfully. We will get back to you within 24 hours.',
      inquiryId: inquiry._id
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiriesAdmin = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Inquiry.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.'
      });
    }

    if (status) inquiry.status = status;
    if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      data: inquiry,
      message: 'Inquiry updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const exportInquiriesCsv = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    const escapeCsv = (str) => {
      if (!str) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Service', 'Budget', 'Status', 'Message', 'Admin Notes'];
    const rows = inquiries.map(i => [
      escapeCsv(i._id),
      escapeCsv(new Date(i.createdAt).toISOString().split('T')[0]),
      escapeCsv(i.name),
      escapeCsv(i.email),
      escapeCsv(i.company),
      escapeCsv(i.service),
      escapeCsv(i.budget),
      escapeCsv(i.status),
      escapeCsv(i.message),
      escapeCsv(i.adminNotes)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="mzsolution-inquiries-${Date.now()}.csv"`);
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
