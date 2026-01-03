# Interactive Blog Platform

A modern, full-stack blogging platform built with Next.js 15, React 19, Prisma ORM, MongoDB, and Tailwind CSS. Features blog post management, user management, and real-time comments.

## Features

### Blog Management
- Create and edit blog posts with rich content
- Read and browse all posts
- Delete posts you no longer want
- Search posts by title and content

### Comments System
- Add comments to any blog post
- Edit your own comments
- Delete comments
- View comment counts on posts

### User Management
- Register and create new users
- View all registered users
- Delete users from the system
- Manage user profiles

### User Interface
- Responsive design for desktop, tablet, and mobile
- Clean and intuitive interface using Tailwind CSS
- Fast performance with server-side rendering
- Smooth transitions and real-time updates

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|------------|
| Next.js | Full-stack framework | 15.x |
| React | UI library | 19.x |
| TypeScript | Type safety | 5.x |
| Prisma | Database ORM | 5.14.x |
| MongoDB | Cloud database | Atlas |
| Tailwind CSS | Styling | 3.4.x |

## Getting Started

### Requirements
- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)

### Installation Steps

1. Navigate to the project folder
```bash
cd merged-blog-platform
```

2. Install all dependencies
```bash
npm install
```

3. Create .env.local file with environment variables
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/blog_db"
JWT_SECRET="your-secure-random-string"
```

4. Set up the database schema
```bash
npx prisma db push
```

5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

### What This App Can Do

- Create new users with unique email addresses
- Edit existing user information at any time
- Delete users from the system completely
- View the complete list of all registered users
- Write and publish new blog posts
- Edit your existing blog posts
- Delete posts you no longer want
- Search through all posts by title and content
- Add comments to any blog post
- Edit your comments after posting
- Delete comments when needed
- View all comments on each post
- Responsive mobile-first design
- Real-time UI updates without page refreshes

### Folder Organization

**Frontend Components**
- Header with navigation menu
- Footer with information
- Blog post card components
- Comment display components
- User list components

**Backend Logic**
- User controller for user operations
- Post controller for blog management
- Comment controller for comment management
- Database models and schema
- API utility functions

**Database**
- MongoDB integration with Prisma
- User schema with email validation
- Blog post schema with author relationships
- Comment schema with post and author relationships

## Tech Stack

Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS

Backend: Next.js API Routes, Node.js, Prisma ORM

Database: MongoDB Atlas with cloud hosting

Authentication: JWT-ready infrastructure

Prisma ORM

MongoDB Atlas

Tailwind CSS

💻 How to run locally (PowerShell users)

Run these commands inside your project folder:

1️⃣ Install dependencies
npm install

2️⃣ Create .env.local
notepad .env.local


Add:

DATABASE_URL="your MongoDB connection string"
JWT_SECRET="any-secure-random-string"

3️⃣ Start the project
npm run dev


Now open:
👉 http://localhost:3000

📦 Build for production
npm run build
npm start

📁 Folder Structure
src/
 ├─ app/            # UI pages + API routes
 ├─ controllers/    # Logic for handling requests
 ├─ models/         # Types and interfaces
 ├─ utils/          # Helper functions
 └─ config/         # Environment + config files

prisma/
 └─ schema.prisma   # Database schema

🌐 Deployment (Vercel)

Just push changes to GitHub — Vercel auto-deploys the project.
If Vercel ever shows build errors, simply:

npm install
git add .
git commit -m "update deps"
git push


Then Redeploy without cache on Vercel.

🎯 Why this project exists

This project is made to practice and showcase:

full-stack development skills

clean code

database integration

API routes

modern React
Perfect for portfolio, interviews, and learning real production tools.

✨ Author

Ishan Gupta
Feel free to explore and modify the project.