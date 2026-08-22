# Railway Deployment Guide

## Prerequisites
- Railway account
- GitHub repository connected to Railway

## Backend Deployment

### 1. Create Backend Service
1. Go to Railway dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory: `backend`

### 2. Configure Environment Variables
Add these environment variables in Railway dashboard:

```env
NODE_ENV=production
PORT=5000
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=pesantren_db
DB_PORT=3306
JWT_SECRET=your-secure-jwt-secret-change-this
JWT_EXPIRE=7d
```

### 3. Add MySQL Database
1. In your Railway project, click "New" → "Database" → "Add MySQL"
2. Railway will automatically provide connection details
3. Update backend environment variables with MySQL credentials from Railway

### 4. Deploy
- Railway will automatically build and deploy using `nixpacks.toml`
- Wait for deployment to complete
- Note the backend URL (e.g., `https://your-app.up.railway.app`)

## Frontend Deployment

### 1. Create Frontend Service
1. In the same Railway project, click "New" → "GitHub Repo"
2. Select your repository again
3. Set root directory: `frontend`

### 2. Configure Environment Variables
Add this environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.up.railway.app/api
```

**Important:** Replace `your-backend-url` with your actual backend Railway URL

### 3. Deploy
- Railway will automatically build and deploy using `nixpacks.toml`
- Wait for deployment to complete
- Your frontend will be available at the generated URL

## Troubleshooting

### Build Fails with TypeScript Error
- Fixed: Updated TypeScript version to 5.6.0 (was incorrectly set to 6.0.2)
- If still failing, check Railway build logs for specific errors

### Frontend Can't Connect to Backend
1. Check `VITE_API_BASE_URL` in frontend environment variables
2. Make sure it points to your backend Railway URL with `/api` suffix
3. Verify backend CORS settings allow frontend domain

### Database Connection Failed
1. Check MySQL database is running in Railway
2. Verify all DB_* environment variables are correct
3. Ensure backend can access Railway MySQL (should be automatic)

### Deploy Command Issues
- Backend uses: `node server.js`
- Frontend uses: `npm run preview -- --host 0.0.0.0 --port $PORT`
- These are configured in `railway.toml` and `nixpacks.toml`

## Build Configuration

### Backend
- Builder: NIXPACKS
- Build command: `npm ci`
- Start command: `node server.js`
- Config file: `backend/nixpacks.toml`, `backend/railway.toml`

### Frontend
- Builder: NIXPACKS
- Build command: `npm ci --legacy-peer-deps && npm run build`
- Start command: `npm run preview -- --host 0.0.0.0 --port $PORT`
- Config file: `frontend/nixpacks.toml`, `frontend/railway.toml`

## Post-Deployment

### Initialize Database
1. Connect to your Railway MySQL database
2. Run the schema from `backend/database/schema.sql`
3. Create initial admin user if needed

### Verify Deployment
1. Visit frontend URL
2. Try to login/register
3. Check all features work correctly

## Monitoring
- Railway provides logs for both services
- Click on each service to view logs
- Set up alerts in Railway dashboard if needed

## Updates
- Push to GitHub main branch
- Railway will automatically redeploy both services
- Monitor deployment status in Railway dashboard
