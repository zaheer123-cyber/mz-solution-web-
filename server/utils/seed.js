import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, closeDB } from '../config/db.js';
import { AdminUser } from '../models/AdminUser.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Inquiry } from '../models/Inquiry.js';
import { WebsiteSettings } from '../models/WebsiteSettings.js';
import { AnalyticsEvent } from '../models/AnalyticsEvent.js';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding process...');
    await connectDB();

    // 1. Seed or Update Admin User
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL?.trim();
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Admin User';

    if (!adminEmail || !adminPassword) {
      throw new Error('INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD must be set before seeding.');
    }

    if (adminPassword.length < 12) {
      throw new Error('INITIAL_ADMIN_PASSWORD must be at least 12 characters long.');
    }

    let admin = await AdminUser.findOne({ email: adminEmail.toLowerCase() });
    if (!admin) {
      admin = await AdminUser.create({
        name: adminName,
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'superadmin'
      });
      console.log(`👤 Admin created: ${adminEmail}`);
    } else {
      console.log(`👤 Admin already exists: ${adminEmail}`);
    }

    // 2. Seed Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const initialServices = [
        {
          title: 'MERN Stack Development',
          slug: 'mern-stack-development',
          description: 'Full-stack web applications built with MongoDB, Express.js, React.js, and Node.js for high performance and scalability.',
          icon: 'Code',
          benefits: ['Custom API Integrations', 'Real-time Features', 'High Security Standards'],
          startingPrice: '$3,000',
          order: 1,
          published: true
        },
        {
          title: 'Custom Software',
          slug: 'custom-software',
          description: 'Bespoke software solutions tailored to your unique business workflows, optimizing efficiency and productivity.',
          icon: 'Layers',
          benefits: ['Enterprise CRM/ERP', 'Workflow Automation', 'Legacy System Upgrade'],
          startingPrice: '$5,000',
          order: 2,
          published: true
        },
        {
          title: 'Responsive Web Design',
          slug: 'responsive-web-design',
          description: 'Modern, fast, and mobile-first websites that provide an exceptional user experience across all devices.',
          icon: 'Smartphone',
          benefits: ['Mobile-First Approach', 'Speed Optimization', 'SEO-Friendly Structure'],
          startingPrice: '$1,500',
          order: 3,
          published: true
        },
        {
          title: 'SaaS Development',
          slug: 'saas-development',
          description: 'Building robust Software as a Service platforms with multi-tenancy, billing integrations, and analytics.',
          icon: 'Cloud',
          benefits: ['Subscription Management', 'Scalable Infrastructure', 'Third-Party API Sync'],
          startingPrice: '$6,000',
          order: 4,
          published: true
        },
        {
          title: 'E-commerce Development',
          slug: 'ecommerce-development',
          description: 'Scalable online stores with seamless payment gateways, inventory management, and high conversion rates.',
          icon: 'ShoppingCart',
          benefits: ['Stripe/PayPal Integration', 'Product Management', 'Secure Checkout'],
          startingPrice: '$2,500',
          order: 5,
          published: true
        },
        {
          title: 'Maintenance & Opt.',
          slug: 'maintenance-optimization',
          description: 'Continuous support, performance tuning, and security updates to keep your digital assets in top shape.',
          icon: 'ShieldCheck',
          benefits: ['24/7 Monitoring', 'Performance Audits', 'Bug Fixing & Updates'],
          startingPrice: '$500/mo',
          order: 6,
          published: true
        },
        {
          title: 'UI/UX Design',
          slug: 'ui-ux-design',
          description: 'Creating intuitive, beautiful, and accessible user interfaces that engage users and drive actions.',
          icon: 'Palette',
          benefits: ['User Research', 'Interactive Prototyping', 'Visual Identity Design'],
          startingPrice: '$1,800',
          order: 7,
          published: true
        },
        {
          title: 'Digital Marketing & SEO',
          slug: 'digital-marketing-seo',
          description: 'Strategic marketing campaigns and SEO optimization to boost your visibility and drive organic growth.',
          icon: 'TrendingUp',
          benefits: ['Keyword Research', 'Content Strategy', 'Social Media Ads'],
          startingPrice: '$1,200',
          order: 8,
          published: true
        }
      ];

      await Service.insertMany(initialServices);
      console.log(`⚡ Seeded ${initialServices.length} services.`);
    }

    // 3. Seed Projects
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      const initialProjects = [
        {
          title: 'NexGen SaaS Dashboard',
          slug: 'nexgen-saas-dashboard',
          category: 'SaaS',
          technologies: ['SaaS', 'React', 'Node.js', 'Tailwind CSS', 'Recharts'],
          shortDescription: 'A powerful administrative platform designed for real-time analytics and project management, featuring high-fidelity data visualizations.',
          description: 'NexGen SaaS Dashboard provides mission-critical enterprise metrics in real-time. Built with high-fidelity React charts, WebSocket telemetry, role-based access control, and automated report generation for fast-growing technology companies.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          liveUrl: 'https://nexgen-demo.mzsolution.com',
          githubUrl: 'https://github.com/mzsolution/nexgen-dashboard',
          clientName: 'NexGen Cloud Inc.',
          featured: true,
          published: true,
          order: 1
        },
        {
          title: 'FinNexus Banking App',
          slug: 'finnexus-banking-app',
          category: 'Fintech',
          technologies: ['Fintech', 'Mobile', 'Flutter', 'Node.js', 'MongoDB'],
          shortDescription: 'A secure and intuitive mobile banking experience that enables users to manage their finances effortlessly on the go.',
          description: 'FinNexus delivers next-generation banking with biometric authentication, instant peer-to-peer transfers, automated savings buckets, and end-to-end encrypted ledger accounting designed to handle millions of daily transactions.',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
          liveUrl: 'https://finnexus-demo.mzsolution.com',
          clientName: 'FinNexus Global',
          featured: true,
          published: true,
          order: 2
        },
        {
          title: 'EcoStyle Marketplace',
          slug: 'ecostyle-marketplace',
          category: 'E-commerce',
          technologies: ['E-commerce', 'Next.js', 'Tailwind', 'Stripe', 'MongoDB'],
          shortDescription: 'A high-performance e-commerce platform focused on sustainable fashion, featuring a lightning-fast checkout process.',
          description: 'EcoStyle is a global marketplace for ethically sourced, carbon-neutral clothing brands. Features include dynamic filters, multi-currency Stripe checkout, live inventory tracking, and custom vendor storefronts.',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
          liveUrl: 'https://ecostyle-demo.mzsolution.com',
          clientName: 'EcoStyle Apparel',
          featured: false,
          published: true,
          order: 3
        },
        {
          title: 'InsightAI Tool',
          slug: 'insightai-tool',
          category: 'Web Apps',
          technologies: ['AI', 'Python', 'TensorFlow', 'React', 'FastAPI'],
          shortDescription: 'An AI-powered analytics tool that provides deep business insights through machine learning and advanced data modeling.',
          description: 'InsightAI combines neural-network predictive intelligence with automated executive summaries. Built to empower decision-makers to forecast churn, detect anomalies, and streamline supply chains with zero ML background required.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          liveUrl: 'https://insightai-demo.mzsolution.com',
          clientName: 'Insight Intelligence',
          featured: false,
          published: true,
          order: 4
        }
      ];

      await Project.insertMany(initialProjects);
      console.log(`📁 Seeded ${initialProjects.length} portfolio projects.`);
    }

    // 4. Seed Inquiries (matching Page 5 in PDF)
    const inquiriesCount = await Inquiry.countDocuments();
    if (inquiriesCount === 0) {
      const initialInquiries = [
        {
          name: 'Robert King',
          email: 'robert@kingdesign.io',
          company: 'King Studio',
          service: 'UI/UX Design',
          budget: '$3,500',
          message: 'We are seeking a complete brand redesign and high-fidelity interactive Figma prototype for our upcoming iOS and Android app.',
          status: 'New',
          adminNotes: 'High priority lead. Schedule introductory video call.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
        },
        {
          name: 'Alice Smith',
          email: 'alice@innovatesoft.com',
          company: 'InnovateSoft',
          service: 'SaaS Platform',
          budget: '$15,000',
          message: 'Looking to build an enterprise multi-tenant workflow automation portal with Stripe subscription billing and role permissions.',
          status: 'In Progress',
          adminNotes: 'Sent initial proposal and architecture overview on Oct 25.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28) // 1 day ago
        },
        {
          name: 'John Doe',
          email: 'john@doeenterprises.com',
          company: 'Doe Enterprises',
          service: 'Web Development',
          budget: '$5,000',
          message: 'We require a modern high-speed dark mode website for our consulting firm with dynamic project showcase and SEO optimization.',
          status: 'Completed',
          adminNotes: 'Contract signed and project successfully delivered.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52) // 2 days ago
        }
      ];

      await Inquiry.insertMany(initialInquiries);
      console.log(`✉️ Seeded ${initialInquiries.length} sample inquiries.`);
    }

    // 5. Seed Website Settings
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({
        companyName: 'MzSolution',
        tagline: 'Premium digital solutions for the modern era.',
        email: 'info@mzsolution.com',
        phone: '+1 (555) 000-0000',
        whatsapp: '+1 (555) 000-0001',
        address: '123 Tech Avenue, Silicon Valley',
        logo: '',
        socialLinks: {
          facebook: 'https://facebook.com/mzsolution',
          tiktok: 'https://tiktok.com/@mzsolution',
          linkedin: 'https://linkedin.com/company/mzsolution',
          twitter: 'https://twitter.com/mzsolution',
          instagram: 'https://instagram.com/mzsolution',
          github: 'https://github.com/mzsolution'
        },
        seoTitle: 'MzSolution | We Build Digital Experiences That Drive Growth',
        seoDescription: 'Empowering businesses with scalable websites, high-performance web applications, and cutting-edge digital marketing solutions.',
        footerText: '© 2024 MzSolution. All rights reserved.'
      });
      console.log('⚙️ Seeded default website settings.');
    }

    // 6. Seed Analytics Events for chart visualization
    const analyticsCount = await AnalyticsEvent.countDocuments();
    if (analyticsCount === 0) {
      const events = [];
      const sources = ['Direct', 'Organic Search', 'Social Media', 'Referral'];
      const pages = ['/', '/services', '/projects', '/about', '/contact'];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayVisits = 15 + Math.floor(Math.random() * 25);

        for (let j = 0; j < dayVisits; j++) {
          const randomSource = sources[Math.floor(Math.random() * sources.length)];
          const randomPage = pages[Math.floor(Math.random() * pages.length)];
          const visitorHash = `seed_user_${(j % 8) + 1}`;

          events.push({
            eventType: 'pageview',
            path: randomPage,
            referrerSource: randomSource,
            visitorHash,
            createdAt: new Date(date.getTime() + Math.random() * 3600000 * 20)
          });
        }
      }

      await AnalyticsEvent.insertMany(events);
      console.log(`📊 Seeded ${events.length} initial analytics events.`);
    }

    console.log('✅ Seeding completed successfully!');
  } finally {
    if (process.argv[1]?.endsWith('seed.js')) {
      await closeDB();
    }
  }
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exitCode = 1;
  });
}
