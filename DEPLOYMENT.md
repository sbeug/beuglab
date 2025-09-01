Deployment Instructions for Client
Required Environment Variables
Set these in your Vercel dashboard under Project Settings → Environment Variables:
Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-domain.com
DATABASE_URL=your-database-connection-string
API_SECRET_KEY=your-secret-key
Optional Environment Variables
ANALYTICS_ID=your-analytics-id
CONTACT_EMAIL=contact@yourclientdomain.com
Vercel Deployment Steps

Import Repository to Vercel:

Go to vercel.com
Click "New Project"
Import your forked/mirrored repository
Vercel will auto-detect framework settings

Configure Environment Variables:

In your Vercel project dashboard
Go to Settings → Environment Variables
Add all required variables listed above

Deploy:

Vercel will automatically deploy from the main branch
Every time the repository updates, Vercel will redeploy

Build Configuration
The site is configured to:

Build Command: npm run build
Output Directory: dist (or out for Next.js)
Install Command: npm install
Node Version: 18.x (recommended)

Custom Domain Setup
To use your custom domain:

In Vercel project settings → Domains
Add your domain (e.g., www.yourclientdomain.com)
Configure DNS records as instructed by Vercel

Support
If you encounter issues:

Check the Vercel deployment logs
Verify all environment variables are set correctly
Ensure your domain DNS is properly configured
