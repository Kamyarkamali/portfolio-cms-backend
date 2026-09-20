# Portfolio CMS Backend

A production-oriented backend for a bilingual personal portfolio website, built with **Node.js, Express, TypeScript, MongoDB, and Mongoose**.

The system provides a secure admin CMS for managing portfolio content, authentication, projects, experience, services, technologies, resume files, contact methods, and incoming messages.

> 🇬🇧 English documentation is provided first for international developers and employers.
> 🇮🇷 مستندات فارسی در ادامه آمده است.

---

## 🇬🇧 English

### Overview

This project is the backend and content management system for a bilingual personal portfolio website.

The API is designed to support a **Persian/English (FA/EN)** portfolio while keeping content management, authentication, media handling, and public APIs separated from the frontend.

The backend is built with a focus on:

* Clean API structure
* Secure authentication
* Resource validation
* Controlled data updates
* Media/file management
* MongoDB data modeling
* Public and protected API separation
* AI-assisted software development with human architectural review

---

## ✨ Features

### 🔐 Authentication & Authorization

* Admin authentication using **JWT**
* Authentication token stored in an **HTTP-only cookie**
* Protected admin routes
* Password hashing with **bcrypt**
* Admin session verification
* Secure logout
* Role-based admin structure
* CORS configured for credentialed requests
* No authentication tokens stored in `localStorage` or `sessionStorage`

### 📝 Portfolio CMS

The admin API supports managing:

* Hero section
* Profile / About
* Work experiences
* Services
* Technologies
* Languages
* Projects
* Resume
* Contact methods
* Contact messages

### 🌍 Bilingual Content

Translatable content uses a consistent structure:

```json
{
  "fa": "متن فارسی",
  "en": "English content"
}
```

This allows the React frontend to display content according to the active language.

### 🖼️ Media Management

The backend supports secure media handling for:

* Project images
* Hero images
* Profile images
* Resume files

Upload rules:

| File type | Allowed formats | Maximum size |
| --------- | --------------- | -----------: |
| Images    | JPEG, PNG, WebP |         5 MB |
| Resume    | PDF             |        10 MB |

Additional protections include:

* Multipart/form-data uploads
* MIME type validation
* File extension validation
* File signature validation
* Server-generated filenames
* Path traversal protection
* Automatic cleanup of replaced/deleted files
* Storage abstraction through a `StorageProvider`

SVG uploads are intentionally disabled to reduce potential XSS risks.

---

## 📡 API Structure

### Health

```http
GET /api/health
```

### Authentication

```http
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Public API

```http
GET  /api/public/portfolio
GET  /api/public/hero
GET  /api/public/profile
GET  /api/public/experiences
GET  /api/public/services
GET  /api/public/technologies
GET  /api/public/languages
GET  /api/public/projects
GET  /api/public/resume
GET  /api/public/contact-methods
POST /api/public/contact-messages
```

### Admin API

Admin endpoints require authentication.

```http
GET    /api/admin/hero
PUT    /api/admin/hero

GET    /api/admin/profile
PUT    /api/admin/profile

GET    /api/admin/resume
PUT    /api/admin/resume

GET    /api/admin/experiences
POST   /api/admin/experiences
GET    /api/admin/experiences/:id
PATCH  /api/admin/experiences/:id
DELETE /api/admin/experiences/:id
```

The same CRUD pattern is available for other repeatable portfolio resources such as services, technologies, languages, projects, and contact methods.

Contact messages also support administrative operations such as listing, reading, updating status, and deletion.

---

## 🏗️ Architecture

The project follows a modular backend structure:

```text
src/
├── config/
│   ├── database.ts
│   └── env.ts
│
├── middleware/
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── notFound.ts
│   └── validation.ts
│
├── models/
│   ├── admin.model.ts
│   └── content.model.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── content.routes.ts
│   └── health.routes.ts
│
├── services/
│   ├── auth.service.ts
│   └── storage.service.ts
│
├── types/
│   ├── auth.ts
│   ├── content.ts
│   └── express.d.ts
│
├── utils/
│   └── http.ts
│
├── app.ts
└── server.ts
```

### Request Flow

```text
Client
  ↓
Express
  ↓
Middleware
  ├── Authentication
  ├── Validation
  └── Error Handling
  ↓
Routes
  ↓
Services
  ↓
Mongoose Models
  ↓
MongoDB
```

---

## 🛡️ Security

Security considerations implemented in the project include:

* HTTP-only authentication cookies
* Password hashing with bcrypt
* JWT-based authentication
* Protected admin routes
* Input validation
* ObjectId validation
* Controlled update payloads
* URL and email validation
* File type and signature validation
* Generated storage filenames
* Path traversal protection
* CORS restrictions
* Contact form rate limiting
* No secrets committed to the repository

---

## 🗄️ Database

The project uses:

* **MongoDB**
* **Mongoose**

Main data models include:

```text
Admin
Hero
Profile
Experience
Service
Technology
Language
Project
Resume
ContactMethod
ContactMessage
```

---

## 🧪 Verification

The backend has been verified with:

* TypeScript compilation
* Server startup
* MongoDB connection
* Authentication flow
* Protected route authorization
* ObjectId validation
* CRUD operations
* Contact message lifecycle
* Project image lifecycle
* Resume upload/replacement/deletion
* Physical file cleanup

Build:

```bash
npm run build
```

---

## ⚙️ Installation

### Requirements

* Node.js
* MongoDB
* npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file based on:

```text
.env.example
```

Never commit the real `.env` file.

### Run development server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Run production build

```bash
npm start
```

---

## 🔗 Frontend Integration

The backend is designed to be consumed by a separate **React + TypeScript** frontend.

Authentication requests must include credentials:

```ts
fetch("/api/auth/me", {
  credentials: "include"
});
```

The authentication token is intentionally handled through an HTTP-only cookie rather than browser storage.

The planned frontend architecture includes:

```text
React
├── Public Portfolio
└── Admin Panel
    ├── Authentication
    ├── Dashboard
    ├── Content Management
    ├── Projects
    ├── Resume
    └── Contact Messages
```

---

## 🤖 AI-Assisted Development

This project was developed using an **AI-assisted engineering workflow**.

AI tools are used for implementation, refactoring, debugging, and testing assistance, while architectural decisions, requirements, security considerations, code review, and final validation remain human-controlled.

The goal is not to replace software engineering fundamentals with AI, but to use AI as an engineering productivity tool.

---

## 🚀 Future Improvements

Potential future improvements include:

* React Admin Dashboard
* Cloud storage integration such as S3 or Cloudinary
* Email notifications for contact messages
* Automated API tests
* CI/CD pipeline
* Advanced logging and monitoring
* More granular role and permission management
* API documentation with OpenAPI / Swagger
* Production deployment configuration

---

## 👨‍💻 Author

**Kamyar Kamali**

Frontend Developer transitioning toward broader software engineering and AI-assisted development.

* GitHub: `Kamyarkamali`
* Portfolio: Coming soon

---

# 🇮🇷 فارسی

## معرفی

این پروژه Backend و سیستم مدیریت محتوای یک وب‌سایت Portfolio شخصی دوزبانه است که با تکنولوژی‌های زیر ساخته شده است:

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt

هدف پروژه ایجاد یک Backend مستقل و قابل توسعه برای مدیریت محتوای Portfolio به زبان‌های فارسی و انگلیسی است.

---

## ✨ امکانات

### 🔐 احراز هویت

* ورود امن مدیر
* JWT Authentication
* استفاده از HTTP-only Cookie
* محافظت از مسیرهای Admin
* Hash کردن رمز عبور با bcrypt
* بررسی Session مدیر
* Logout امن
* محدود کردن CORS
* عدم استفاده از localStorage برای Token

### 📝 مدیریت Portfolio

مدیر می‌تواند موارد زیر را مدیریت کند:

* Hero Section
* پروفایل و About
* سوابق کاری
* خدمات
* تکنولوژی‌ها
* زبان‌ها
* پروژه‌ها
* رزومه
* راه‌های ارتباطی
* پیام‌های ارسال‌شده از فرم تماس

---

## 🌍 پشتیبانی از دو زبان

محتوای قابل ترجمه با ساختار زیر ذخیره می‌شود:

```json
{
  "fa": "متن فارسی",
  "en": "English content"
}
```

بنابراین Frontend می‌تواند بر اساس زبان انتخاب‌شده، نسخه فارسی یا انگلیسی محتوا را نمایش دهد.

---

## 🖼️ مدیریت فایل

سیستم آپلود برای تصاویر و فایل رزومه طراحی شده است.

| نوع فایل | فرمت              | حداکثر حجم |
| -------- | ----------------- | ---------: |
| تصویر    | JPEG / PNG / WebP |       5 MB |
| رزومه    | PDF               |      10 MB |

برای امنیت بیشتر:

* آپلود به صورت multipart/form-data انجام می‌شود.
* MIME Type بررسی می‌شود.
* Extension بررسی می‌شود.
* File Signature بررسی می‌شود.
* نام فایل توسط سرور تولید می‌شود.
* Path Traversal جلوگیری می‌شود.
* فایل‌های قدیمی هنگام جایگزینی پاک می‌شوند.
* Storage از طریق `StorageProvider` قابل تعویض است.

فرمت SVG عمداً غیرفعال شده است تا سطح ریسک XSS کاهش پیدا کند.

---

## 🏗️ معماری

ساختار Backend به صورت ماژولار طراحی شده است:

```text
Client
  ↓
Express
  ↓
Middleware
  ↓
Routes
  ↓
Services
  ↓
Mongoose
  ↓
MongoDB
```

لایه‌های اصلی شامل:

* Configuration
* Middleware
* Models
* Routes
* Services
* Types
* Utilities

---

## 🛡️ امنیت

برخی از ملاحظات امنیتی پیاده‌سازی‌شده:

* HTTP-only Cookie
* JWT Authentication
* bcrypt password hashing
* Protected Admin Routes
* Validation
* ObjectId Validation
* Controlled Update Payloads
* اعتبارسنجی Email و URL
* اعتبارسنجی فایل
* جلوگیری از Path Traversal
* CORS محدود
* Rate Limiting برای فرم تماس
* عدم قرار دادن Secretها در Git

---

## 🧪 تست و بررسی

Backend موارد زیر را با موفقیت بررسی کرده است:

* Build پروژه
* اجرای Server
* اتصال MongoDB
* Login
* Session verification
* Logout
* Protected routes
* CRUD منابع
* مدیریت پیام‌های تماس
* مدیریت تصاویر پروژه
* آپلود و جایگزینی Resume
* حذف فایل‌های قدیمی

---

## ⚙️ نصب و اجرا

ابتدا dependencyها را نصب کنید:

```bash
npm install
```

سپس فایل `.env` را بر اساس `.env.example` ایجاد کنید.

برای اجرای Development:

```bash
npm run dev
```

برای Build:

```bash
npm run build
```

برای اجرای نسخه Build شده:

```bash
npm start
```

> فایل `.env` نباید در GitHub قرار بگیرد.

---

## 🤖 توسعه با کمک هوش مصنوعی

این پروژه با استفاده از یک Workflow مبتنی بر **AI-Assisted Software Engineering** توسعه داده شده است.

ابزارهای هوش مصنوعی برای مواردی مانند:

* پیاده‌سازی
* Refactoring
* Debugging
* تست
* بررسی کد

استفاده شده‌اند.

با این حال، تصمیمات معماری، تعریف نیازمندی‌ها، ملاحظات امنیتی، بررسی خروجی AI و اعتبارسنجی نهایی توسط توسعه‌دهنده انجام می‌شود.

هدف پروژه استفاده از AI به عنوان **ابزار افزایش بهره‌وری مهندس نرم‌افزار** است، نه جایگزین کردن اصول مهندسی نرم‌افزار با Prompt.

---

## 🚀 توسعه‌های آینده

* ساخت React Admin Panel
* اتصال Cloud Storage
* Email Notification
* Automated Tests
* CI/CD
* Monitoring و Logging
* Role & Permission Management
* OpenAPI / Swagger
* Production Deployment

---

## 👨‍💻 نویسنده

**Kamyar Kamali**

Frontend Developer در مسیر توسعه مهارت‌های Software Engineering و AI-Assisted Development.

GitHub: `Kamyarkamali`
