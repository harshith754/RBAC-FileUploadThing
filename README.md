# FileUpload RBAC Demo

A modern, full-stack Next.js 15 application demonstrating robust **role-based access control (RBAC)** and seamless **file upload** capabilities. Built with a focus on security, scalability, and developer experience, this project leverages the latest tools and best practices in the React/Next.js ecosystem.

---

## ✨ Features

- **Role-Based Access Control (RBAC):**

  - Fine-grained user roles (Admin, Super Admin, User, etc.)
  - Secure, server-enforced permissions for all sensitive actions
  - Admin dashboard for user management

- **File Upload System:**

  - Drag-and-drop file uploads with progress tracking
  - Uploads are stored in Cloudinary for scalability and performance
  - Uploaded files are associated with users in the database
  - File size formatting, error handling, and upload queue UI

- **Authentication & User Management:**

  - Powered by [Clerk](https://clerk.com) for seamless sign-in, sign-up, and user profile management
  - Clerk metadata is used to assign and enforce roles

- **Modern UI & Components:**

  - Built with [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible, and customizable React components
  - Responsive design for desktop and mobile

- **Database & ORM:**

  - [Prisma](https://www.prisma.io/) as the type-safe ORM
  - [Neon](https://neon.tech/) serverless Postgres for scalable, fast, and reliable data storage
  - Prisma Accelerate for optimized query performance

- **API Routes & Server Actions:**

  - Next.js App Router with server actions for secure, type-safe backend logic
  - RESTful API endpoints for file upload, user creation, and more

- **Developer Experience:**
  - TypeScript-first codebase
  - ESLint, Prettier, and strict type-checking
  - Postinstall scripts ensure Prisma client is always generated

---

## 🛠️ Packages & Technologies Used

- **Next.js 15** – App Router, server components, and modern React features
- **shadcn/ui** – UI primitives and components
- **Clerk** – Authentication, user management, and RBAC metadata
- **Prisma** – Type-safe ORM for Postgres
- **Neon** – Serverless Postgres database
- **Cloudinary** – File storage and CDN for uploads
- **formidable** – Node.js file upload parser
- **lucide-react** – Icon library
- **@prisma/extension-accelerate** – Prisma query acceleration

---

## 🚀 How It Works

1. **User Authentication:**
   - Users sign up/sign in with Clerk. Roles are assigned via Clerk metadata.
2. **RBAC Enforcement:**
   - Server actions and API routes check user roles before allowing access to admin features or file management.
3. **File Upload:**
   - Users upload files via a drag-and-drop UI. Files are sent to a Next.js API route, parsed with formidable, uploaded to Cloudinary, and saved in Neon Postgres via Prisma.
4. **Admin Dashboard:**
   - Admins can view and manage users, assign roles, and see uploaded files.

---

## 📦 Getting Started

1. Clone the repo and install dependencies:
   ```sh
   git clone <repo-url>
   cd rbac-fileupload-thing
   npm install
   ```
2. Set up your `.env` with Clerk, Cloudinary, and Neon credentials.
3. Run the Prisma migrations and generate the client:
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```
4. Start the dev server:
   ```sh
   npm run dev
   ```

---

## 📝 Credits & Inspiration

- [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Prisma](https://www.prisma.io/)
- [Neon](https://neon.tech/)
- [Cloudinary](https://cloudinary.com/)

---

## 💡 Why This Project?

This project is a production-grade template for building secure, scalable SaaS apps with modern authentication, RBAC, and file management. It demonstrates:

- How to combine Clerk, Prisma, and Neon for a robust backend
- How to use shadcn/ui for a beautiful, accessible frontend
- How to implement real-world RBAC and file upload patterns in Next.js

---

Feel free to fork, star, and use as a foundation for your next project!
