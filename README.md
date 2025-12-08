# Full Stack CRUD Application

A secure, production-ready full-stack CRUD application built with **Next.js 16**, **TypeScript**, **Prisma ORM**, **MongoDB Atlas**, and **JWT Authentication**.

**Developer:** Ishan Gupta  
**GitHub:** [github.com/ishang6664](https://github.com/ishang6664)  
**LinkedIn:** [linkedin.com/in/ishan-gupta-developer](https://www.linkedin.com/in/ishan-gupta-developer/)

## 🎯 Features

✅ **Complete CRUD Operations** - Create, Read, Update, Delete users
✅ **Authentication System** - Secure JWT-based login/signup with bcrypt password hashing
✅ **MongoDB Integration** - Using Prisma ORM with MongoDB Atlas
✅ **Type-Safe** - Full TypeScript support throughout
✅ **Data Validation** - Input validation, sanitization, and duplicate prevention
✅ **Error Handling** - Comprehensive error management with proper HTTP status codes
✅ **RESTful API** - Clean, well-organized API endpoints
✅ **Responsive UI** - Modern, user-friendly interface with Tailwind CSS
✅ **Modular Architecture** - Organized MVC pattern with separation of concerns
✅ **Testing** - Jest unit and integration tests
✅ **Security** - Password hashing, JWT tokens, input sanitization, XSS prevention

## 🛠️ Technology Stack

**Frontend:**
- Next.js 16 - React framework with SSR/SSG
- React 19 - UI library
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first CSS framework

**Backend:**
- Next.js API Routes - Serverless backend
- Prisma ORM 7 - Database abstraction layer
- JWT (jsonwebtoken) - Token-based authentication
- bcrypt - Secure password hashing

**Database:**
- MongoDB Atlas - Cloud database

**Development & Testing:**
- Jest - Testing framework
- ESLint - Code linting
- tsx - TypeScript executor

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Git

## 🚀 Installation & Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd my-crud-app
npm install
```

### 2. Configure Environment Variables

Create `.env` file in root directory:

```env
DATABASE_URL="mongodb+srv://ishang6664_db_user:Ishan%402105@cluster0.mlfl4ze.mongodb.net/?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

## 📁 Project Structure

```
my-crud-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── prisma/
│   │   └── client.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── config/
│   │   └── env.ts
│   ├── utils/
│   │   ├── api.utils.ts
│   │   └── api.utils.test.ts
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── public/
├── jest.config.json
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### User Management Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|---|
| GET | `/api/users` | Get all users | ❌ |
| POST | `/api/users` | Create new user | ❌ |
| GET | `/api/users/[id]` | Get user by ID | ❌ |
| PUT | `/api/users/[id]` | Update user | ❌ |
| DELETE | `/api/users/[id]` | Delete user | ❌ |

## 🔐 Authentication Usage

### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📝 API Examples

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com"
  }'
```

### Get All Users

```bash
curl http://localhost:3000/api/users
```

### Update User

```bash
curl -X PUT http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Updated",
    "email": "jane.updated@example.com"
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

## ✨ Key Features Explained

### Data Validation

- Email format validation with regex
- Name field required and non-empty
- Password minimum 6 characters
- Input sanitization (trimming, XSS prevention)
- Type checking for all inputs

### Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Authentication**: 7-day expiration tokens
- **Duplicate Prevention**: Email uniqueness enforcement
- **Case-Insensitive Emails**: Normalized email handling
- **XSS Prevention**: Angle bracket removal from inputs
- **Error Handling**: Safe error messages without system details

### Error Handling

- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Authentication failure
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Duplicate email
- **500 Internal Server Error**: Server errors with logging

## 📦 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm test                 # Run Jest tests
npm run test:watch      # Watch mode for tests
npm run test:coverage   # Generate coverage report
```

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

Coverage report:

```bash
npm run test:coverage
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT signing | ✅ |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | ✅ |

## 📊 Database Schema

**User Model:**
- `id` (String, Primary Key) - ObjectId
- `name` (String) - User full name
- `email` (String, Unique) - User email
- `password` (String) - Hashed password
- `createdAt` (DateTime) - Account creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

```bash
vercel
```

### Deploy to Other Platforms

Environment variables must be set on:
- `DATABASE_URL` - MongoDB Atlas
- `JWT_SECRET` - Secret key

## 🐛 Troubleshooting

**Issue: Prisma client not generating**
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

**Issue: Database connection failed**
- Verify `DATABASE_URL` in `.env`
- Check MongoDB Atlas whitelist IP
- Ensure database credentials are correct

**Issue: JWT token expired**
- Tokens expire after 7 days
- User must login again to get new token

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

**Ishan Gupta** - Full Stack Developer

- 📧 Email: [your-email@example.com](mailto:your-email@example.com)
- 🐙 GitHub: [github.com/ishang6664](https://github.com/ishang6664)
- 💼 LinkedIn: [linkedin.com/in/ishan-gupta-developer](https://www.linkedin.com/in/ishan-gupta-developer/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the developer directly.

---

**Last Updated:** December 8, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
