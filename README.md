# MzSolution — Full-Stack MERN Website & Digital Agency Platform

A production-oriented full-stack web application for **MzSolution**, a software development company and digital agency. The design and layout have been faithfully implemented to match the **UX Pilot** design system, color palette (`#0B0D12` background, `#141821` cards, `#4F8CFF` electric blue accent), typography, and components.

---

## 🚀 Features Overview

### 1. Public Website
- **Home (`/`)**:
  - Hero: *"We Build Digital Experiences That Drive Growth"* with electric blue gradient typography.
  - Interactive CTAs: *"Start Your Project"* and *"Explore Our Work"*.
  - Hero visual banner featuring active production clusters telemetry graphic.
  - **Our Expertise**: Dynamic cards for MERN Development, Custom Software, UI/UX Design, and Digital Marketing.
  - **Why Partner With MzSolution?**: Quality Assurance, Modern Tech Stack, and Transparent Process highlights.
  - **Featured Projects**: Loaded dynamically from MongoDB with category pills and live demo links.
  - **Our Development Process**: 4 numbered phases (Discover, Design, Develop, Deploy).
  - **Technologies Ticker**: MongoDB, Express.js, React.js, Node.js, TypeScript, JavaScript, Tailwind CSS, etc.
  - **Client Testimonials**: Verified partner reviews (TechFlow, FinNexus, EcoStyle).
  - **Call to Action**: Reusable high-conversion consultation banner.
- **Services (`/services`)**:
  - Full catalog of dynamic service packages from MongoDB.
  - Feature bullet points with glowing cyan-blue indicators and direct project inquiry CTAs.
- **Portfolio (`/projects` & `/projects/:slug`)**:
  - Category filtering (*All Projects*, *SaaS*, *Web Apps*, *Fintech*, *E-commerce*).
  - Live search by project name or technology tag.
  - Detailed case study view with client information, live demo links, and GitHub source links.
- **About Us (`/about`)**:
  - Mission and vision statements.
  - Key business metrics: *10+ Years of Excellence*, *250+ Projects Delivered*, *50+ Expert Specialists*, *98% Client Satisfaction*.
  - Core values: *Innovation*, *Integrity*, *Excellence*.
  - Leadership team: *Alex Rivera*, *Jessica Chen*, *Michael Smith*, *Sarah Williams*.
- **Contact (`/contact`)**:
  - Form validation with **React Hook Form** + **Zod**.
  - Fields: Full Name, Email, Company, Service Required, Budget, and Project Details.
  - Anti-spam honeypot protection & IP rate limiting.
  - Direct contact information, WhatsApp click-to-chat, and verified social links.
- **Legal**: Privacy Policy (`/privacy-policy`) and Terms of Service (`/terms`).

### 2. Secure Admin Dashboard (`/admin`)
- **Authentication**:
  - Secure login (`/admin/login`) with rate limiting (15 attempts/15 min).
  - HTTP-Only, SameSite, Secure-in-production JWT cookie sessions.
  - Password hashing with **bcryptjs** (salt factor 12).
- **Dashboard Overview (`/admin`)** *(Faithfully matches PDF Page 5)*:
  - Top 4 Real-time Metric Cards: *Total Visitors* (+12% ↑), *Total Leads* (+8% ↑), *Total Projects* (Stable), *Inquiries* (New badge).
  - **Traffic & Conversion Chart**: Recharts Area chart with *Last 7 Days* / *Last 30 Days* filter toggle.
  - **Traffic Sources Donut Chart**: Pie chart distribution (*Organic Search*, *Direct*, *Social Media*, *Referral*).
  - **Recent Customer Inquiries Table**: Customer initials, service requested, budget, color-coded status badges, and action triggers.
- **Project Management CRUD (`/admin/projects`)**:
  - Create, edit, delete, and publish/unpublish projects.
  - Slug auto-generation, featured toggle, and file upload via **Multer** or external URL.
- **Services Management CRUD (`/admin/services`)**:
  - Add, edit, delete, order, and toggle visibility of agency services.
- **Inquiry Management (`/admin/inquiries`)**:
  - Search, filter by status (*New*, *Contacted*, *In Progress*, *Completed*).
  - View full message details, update pipeline status, and record internal team notes.
  - **Export to CSV**: Download filtered leads into CSV format for CRM importing.
- **First-Party Analytics (`/admin/analytics`)**:
  - Privacy-preserving, cookie-less audience performance telemetry.
  - Visitor hashing and daily volume charts.
- **Website Settings (`/admin/settings`)**:
  - Manage company name, tagline, email, phone, WhatsApp number, address, social links, and SEO meta tags.
- **Admin Profile (`/admin/profile`)**:
  - Update administrator profile information and change passwords.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Recharts, Axios, React Hook Form, Zod |
| **Backend** | Node.js, Express.js, MongoDB / Mongoose, JWT, bcryptjs, Multer, Helmet, Express Rate Limit, Morgan, Nodemailer |
| **Database** | MongoDB Atlas / Local MongoDB (with automatic fallback to MongoMemoryServer for immediate zero-friction testing) |

---

## 📁 Project Structure

```
mzsolution/
  ├── client/                     # Frontend Vite + React application
  │   ├── index.html              # HTML entry with Plus Jakarta Sans & Inter fonts
  │   ├── vite.config.js          # Vite config with API proxy
  │   ├── tailwind.config.js      # Custom theme colors matching UX Pilot PDF
  │   ├── postcss.config.js
  │   ├── package.json
  │   └── src/
  │       ├── admin/              # Admin pages & layout
  │       │   ├── AdminLayout.jsx
  │       │   ├── AdminLoginPage.jsx
  │       │   ├── AdminDashboard.jsx
  │       │   ├── AdminProjects.jsx
  │       │   ├── AdminServices.jsx
  │       │   ├── AdminInquiries.jsx
  │       │   ├── AdminAnalytics.jsx
  │       │   ├── AdminSettings.jsx
  │       │   ├── AdminProfile.jsx
  │       │   └── ProtectedRoute.jsx
  │       ├── components/         # Reusable UI components
  │       │   ├── Navbar.jsx
  │       │   ├── Footer.jsx
  │       │   ├── CTASection.jsx
  │       │   ├── ServiceCard.jsx
  │       │   ├── ProjectCard.jsx
  │       │   ├── TechTicker.jsx
  │       │   ├── TestimonialCard.jsx
  │       │   └── AnalyticsTracker.jsx
  │       ├── context/            # Global state (AuthContext, SettingsContext)
  │       ├── layouts/            # PublicLayout
  │       ├── pages/              # Public pages (Home, Services, Projects, About, Contact, Legal)
  │       ├── services/           # Axios API instance
  │       ├── App.jsx             # Route definitions
  │       ├── main.jsx            # React root mount
  │       └── index.css           # Tailwind base styles & dark theme glow
  ├── server/                     # Backend Node.js + Express API
  │   ├── config/                 # Database connection (db.js)
  │   ├── controllers/            # Route controllers (auth, projects, services, inquiries, analytics, settings)
  │   ├── middleware/             # Auth, error handling, file upload
  │   ├── models/                 # Mongoose schemas (AdminUser, Project, Service, Inquiry, WebsiteSettings, AnalyticsEvent)
  │   ├── routes/                 # Express API routes
  │   ├── services/               # Email service (Nodemailer)
  │   ├── tests/                  # Automated integration tests (api.test.js)
  │   ├── uploads/                # Static file uploads directory
  │   ├── utils/                  # Database seeder (seed.js)
  │   ├── app.js                  # Express app configuration
  │   ├── server.js               # Server entry point
  │   └── package.json
  ├── package.json                # Root package for running client & server concurrently
  ├── .env.example                # Environment variables template
  ├── .gitignore
  └── README.md
```

---

## ⚡ Installation & Quick Start

### 1. Install Dependencies
In the root directory, install all dependencies for root, server, and client:
```bash
npm run install:all
```
*(Or individually run `npm install` in root, `server/`, and `client/`)*

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```

Set `JWT_SECRET` and `COOKIE_SECRET` to unique random values of at least 32 characters. Set `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`; the password must be at least 12 characters. Do not commit `server/.env`.

### 3. Run Development Servers
Start both the Express backend (`http://localhost:5000`) and the Vite frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Admin Login**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🔐 Initial Admin Account

On first startup in development, the database seeder creates the initial administrator using `INITIAL_ADMIN_EMAIL`, `INITIAL_ADMIN_PASSWORD`, and optionally `INITIAL_ADMIN_NAME` from `server/.env`. Choose a unique, strong password; it is never printed by the seeder.

To manually run the seeder at any time:
```bash
npm run seed
```

---

## 🧪 Automated Testing

Execute the backend integration test suite:
```bash
npm test
```
The test suite verifies:
1. `GET /api/health` — API health status.
2. `GET /api/services` — Public services retrieval.
3. `GET /api/projects` — Public portfolio listing.
4. `GET /api/analytics/overview` — Rejection of unauthorized requests (401).
5. `POST /api/inquiries` — Validation and submission of customer inquiries.

---

## 🌐 Production Deployment

### Frontend Build
```bash
npm run build
```
The optimized bundle is built into `client/dist/`.

### Production Server
Ensure `NODE_ENV=production`, `MONGODB_URI`, and unique `JWT_SECRET` and `COOKIE_SECRET` values of at least 32 characters are configured in `server/.env`.
Start the production server:
```bash
npm start
```
