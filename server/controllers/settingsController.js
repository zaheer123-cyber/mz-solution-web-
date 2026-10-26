import { WebsiteSettings } from '../models/WebsiteSettings.js';

export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings();
    }

    const {
      companyName,
      tagline,
      email,
      phone,
      whatsapp,
      address,
      logo,
      socialLinks,
      seoTitle,
      seoDescription,
      footerText
    } = req.body;

    if (companyName) settings.companyName = companyName;
    if (tagline !== undefined) settings.tagline = tagline;
    if (email) settings.email = email;
    if (phone !== undefined) settings.phone = phone;
    if (whatsapp !== undefined) settings.whatsapp = whatsapp;
    if (address !== undefined) settings.address = address;
    if (logo !== undefined) settings.logo = logo;
    if (seoTitle !== undefined) settings.seoTitle = seoTitle;
    if (seoDescription !== undefined) settings.seoDescription = seoDescription;
    if (footerText !== undefined) settings.footerText = footerText;

    if (socialLinks) {
      settings.socialLinks = {
        ...settings.socialLinks,
        ...socialLinks
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings,
      message: 'Website settings updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};
