# Deployment Guide

This guide explains how to deploy the CRUD application to production.

## Deployment Options

### 1. Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Push code to GitHub**
```bash
git push origin main
```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
   - Click "Add New..."
   - Select "Project"
   - Import from Git repository

3. **Configure Environment Variables**
   - In Vercel Project Settings → Environment Variables
   - Add the following:
     - `DATABASE_URL`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secure JWT secret key
     - `NEXT_PUBLIC_API_URL`: Your production domain

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

5. **CI/CD Pipeline**
   - Every push to `main` branch will trigger automatic deployment
   - Pull requests will create preview deployments

### 2. Docker + Cloud Platform

#### Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Deploy to Cloud:
- AWS ECS / EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

### 3. Self-Hosted (Linux Server)

#### Requirements:
- Linux server with Node.js 18+
- MongoDB connection
- Domain name with SSL

#### Steps:

```bash
# Clone repository
git clone <repo-url>
cd my-crud-app

# Install dependencies
npm install

# Build
npm run build

# Create .env with production values
echo 'DATABASE_URL=...' > .env
echo 'JWT_SECRET=...' >> .env

# Start with PM2
npm install -g pm2
pm2 start "npm start" --name "crud-app"
pm2 startup
pm2 save
```

## Environment Variables for Production

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# Authentication
JWT_SECRET="your-very-secure-random-string-here"

# API Configuration
NEXT_PUBLIC_API_URL="https://yourdomain.com"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
```

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS/SSL certificate
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Set strong database password
- [ ] Enable CORS only for your domain
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Use environment variables for all secrets
- [ ] Regular database backups
- [ ] Monitor application logs

## GitHub Actions CI/CD Setup

1. **Generate Vercel Token**
   - Go to Vercel Account Settings
   - Create new token

2. **Add GitHub Secrets**
   ```
   VERCEL_TOKEN: <your-vercel-token>
   VERCEL_ORG_ID: <your-org-id>
   VERCEL_PROJECT_ID: <your-project-id>
   ```

3. **Pipeline will run on:**
   - Every push to main/develop
   - Pull requests
   - Automatically deploy to Vercel on main branch

## Monitoring

### Log Monitoring
- Vercel: Dashboard → Logs
- Self-hosted: Check PM2 logs
- Cloud platforms: Native logging services

### Uptime Monitoring
- Use services like UptimeRobot
- Set up alerts for downtime

### Performance Monitoring
- Use Next.js Analytics
- Monitor database performance
- Track API response times

## Rollback

### Vercel
- Go to Deployments tab
- Select previous deployment
- Click "Promote to Production"

### Self-Hosted
```bash
pm2 list
pm2 restart 0
git revert <commit-hash>
npm run build
pm2 restart crud-app
```

## Support

For deployment issues, check:
1. Environment variables are set
2. Database connection is working
3. SSL certificate is valid
4. Server firewall allows traffic
5. Application logs for errors
