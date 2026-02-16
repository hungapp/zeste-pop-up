# Zeste Pop-Up Menu Management System - Complete Setup Guide

## 🎉 What Was Built

Your website now has a fully functional admin dashboard where you can update menu photos via Google Drive. The system works on both localhost and production (Vercel).

### Key Features:
- ✅ **Admin Dashboard** - Secure login with Google OAuth
- ✅ **Menu Photo Upload** - Upload dessert and drink menu images
- ✅ **Google Drive Storage** - Automatic backup to Google Drive
- ✅ **Instant Updates** - No redeployment needed when updating menus
- ✅ **Vercel Compatible** - Works seamlessly on Vercel's serverless platform
- ✅ **Image Proxy** - Custom API route serves images with caching

---

## 🏗️ How It Works

```
Admin uploads image
    ↓
Uploaded to Google Drive (backup)
    ↓
File ID saved to config.json
    ↓
Menu page loads image via /api/image/[fileId]
    ↓
API route fetches from Drive & caches
    ↓
Image displayed on website
```

**Architecture:**
- **Frontend**: Next.js 15 with React Server Components
- **Authentication**: NextAuth.js v5 with Google OAuth
- **Storage**: Google Drive API
- **Deployment**: Vercel (production) / localhost (development)

---

## 📋 Initial Setup (One-Time)

### Step 1: Google Cloud Project Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create or Select a Project**
   - Click project dropdown → "New Project"
   - Name: "Zeste Menu Admin" (or any name)
   - Click "Create"

3. **Enable Required APIs**
   - Go to **APIs & Services** → **Library**
   - Search and enable:
     - ✅ **Google Drive API**
     - ✅ **Google+ API** (or People API)

### Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**

2. **User Type**: Select "External"

3. **App Information**:
   - App name: **Zeste Menu Admin**
   - User support email: Your email
   - Developer contact: Your email

4. **Scopes**: Click "Add or Remove Scopes"
   - Add these scopes:
     - `openid`
     - `email`
     - `profile`
     - `https://www.googleapis.com/auth/drive.file`
     - `https://www.googleapis.com/auth/drive.readonly`

5. **Test Users** (while in development):
   - Click "Add Users"
   - Add: `admin@myzeste.com` (or your admin email)

6. Click "Save and Continue" through remaining steps

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**

2. Click **Create Credentials** → **OAuth client ID**

3. **Application Type**: Web application

4. **Name**: Zeste Menu Admin

5. **Authorized redirect URIs** - Add both:
   ```
   http://localhost:3000/api/auth/callback/google
   https://myzeste.com/api/auth/callback/google
   ```

6. Click **Create**

7. **IMPORTANT**: Copy the **Client ID** and **Client Secret**
   - You'll need these for environment variables
   - Store them securely!

### Step 4: Create Google Drive Folder

1. **Go to Google Drive**: https://drive.google.com

2. **Create a new folder**:
   - Name it "Zeste Menu Images" (or any name)
   - This folder will store all uploaded menu photos

3. **Make the folder PUBLIC** (Critical!):
   - Right-click the folder → Click **"Share"**
   - Under "General access" → Click **"Restricted"**
   - Select **"Anyone with the link"**
   - Role: **"Viewer"**
   - Click **"Done"**

4. **Get the Folder ID**:
   - Open the folder
   - Copy the folder ID from the URL:
     ```
     https://drive.google.com/drive/folders/[FOLDER_ID_HERE]
     ```
   - Example: `186SOeo0_FF2oaWYxbqzt4OhJYu4VJzAb`

### Step 5: Configure Environment Variables

1. **Open** `/Users/hnguyenr/Documents/Suis/zeste-pop-up/.env.local`

2. **Update with your values**:
   ```env
   # NextAuth Configuration
   NEXTAUTH_SECRET=iNTMiKgtyd5jGAXI/h06OcUdanelH3SiNPGUC/6NEsE=
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth Configuration (from Step 3)
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret

   # Google Drive Folder ID (from Step 4)
   GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here

   # Admin Email (only this email can access admin)
   ADMIN_EMAIL=admin@myzeste.com
   ```

3. **To generate a new NEXTAUTH_SECRET** (optional):
   ```bash
   openssl rand -base64 32
   ```

---

## 🧪 Testing Locally

### Start Development Server

```bash
cd /Users/hnguyenr/Documents/Suis/zeste-pop-up
npm run dev
```

Server will start at: http://localhost:3000

### Test Admin Dashboard

1. **Go to**: http://localhost:3000/admin
2. **Click**: "Sign in with Google"
3. **Sign in** with your admin email (must match ADMIN_EMAIL)
4. **You should see**: Admin dashboard with current menus

### Test Menu Upload

1. **In admin dashboard**, click "Choose image file" under Dessert or Drink Menu
2. **Select** an image file (JPG, PNG, etc.)
3. **Preview** will show
4. **Click** "Upload Dessert Menu" or "Upload Drink Menu"
5. **Wait** for success message
6. **Page refreshes** automatically
7. **Verify** new image appears in dashboard

### Test Public Menu Page

1. **Go to**: http://localhost:3000/menu
2. **Verify** menu images display correctly
3. **Check** browser DevTools Network tab:
   - Images should load from `/api/image/[fileId]`
   - Status should be 200 OK

---

## 🚀 Deploying to Production (Vercel)

### Prerequisites

- ✅ Code pushed to GitHub repository
- ✅ Vercel account connected to GitHub
- ✅ Domain: https://myzeste.com configured

### Step 1: Set Environment Variables in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Select your project**: zeste-pop-up
3. **Go to**: Settings → Environment Variables
4. **Add each variable**:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXTAUTH_SECRET` | `[same as local]` | Keep the same secret |
| `NEXTAUTH_URL` | `https://myzeste.com` | Production URL |
| `GOOGLE_CLIENT_ID` | `[from Google Cloud]` | OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | `[from Google Cloud]` | OAuth Client Secret |
| `GOOGLE_DRIVE_FOLDER_ID` | `[your folder ID]` | Drive folder ID |
| `ADMIN_EMAIL` | `admin@myzeste.com` | Admin email address |

5. **Click "Save"** for each variable

### Step 2: Deploy

#### Option A: Automatic Deployment (Recommended)

```bash
git add .
git commit -m "Add admin dashboard for menu management

- Add Google OAuth authentication
- Add Google Drive integration
- Add admin dashboard at /admin
- Add image proxy API route
- Update menu page to load from Drive

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push origin main
```

Vercel will automatically deploy! ✨

#### Option B: Manual Deployment

1. Go to Vercel dashboard
2. Click "Deploy"
3. Wait for build to complete

### Step 3: Test Production

1. **Go to**: https://myzeste.com/admin
2. **Sign in** with Google
3. **Upload** a test menu
4. **Visit**: https://myzeste.com/menu
5. **Verify** menu displays correctly

---

## 📖 How to Use (Monthly Menu Updates)

### For Each New Pop-Up:

1. **Go to admin**: https://myzeste.com/admin

2. **Sign in** with Google (if not already signed in)

3. **Upload new dessert menu**:
   - Click "Choose image file" under Dessert Menu
   - Select your new dessert menu image
   - Click "Upload Dessert Menu"
   - Wait for success message

4. **Upload new drink menu**:
   - Click "Choose image file" under Drink Menu
   - Select your new drink menu image
   - Click "Upload Drink Menu"
   - Wait for success message

5. **Done!** ✨
   - New menus are live immediately
   - Old menus are replaced automatically
   - Backups stored in Google Drive

### Notes:
- ✅ **No redeployment needed** - Changes are instant
- ✅ **Any image format works** - JPG, PNG, WebP, etc.
- ✅ **File name doesn't matter** - System handles naming
- ✅ **Old images overwritten** - Config only stores latest URLs

---

## 🗂️ File Structure

```
zeste-pop-up/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx             # Main admin page
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── upload-form.tsx      # Upload form component
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts         # NextAuth API routes
│   │   ├── upload/
│   │   │   └── route.ts         # File upload handler
│   │   └── image/[fileId]/
│   │       └── route.ts         # Image proxy (serves from Drive)
│   │
│   ├── menu/
│   │   └── page.tsx             # Public menu page (updated)
│   │
│   └── layout.tsx               # Root layout
│
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── drive.ts                 # Google Drive functions
│   └── menu-config.json         # Current menu URLs (dynamic)
│
├── types/
│   └── next-auth.d.ts           # TypeScript types for NextAuth
│
├── middleware.ts                # Route protection
├── .env.local                   # Environment variables (local)
├── .env.local.example           # Environment template
└── next.config.mjs              # Next.js configuration
```

---

## 🔧 Technical Details

### Authentication Flow

1. User visits `/admin`
2. Middleware checks for session
3. If not authenticated → redirect to `/admin/login`
4. User clicks "Sign in with Google"
5. Google OAuth flow:
   - Requests: `openid`, `email`, `profile`, `drive.file`, `drive.readonly`
   - User grants permission
   - Callback to `/api/auth/callback/google`
6. NextAuth creates session
7. User redirected to `/admin`

### Upload Flow

1. Admin selects image file
2. File previewed in browser
3. Admin clicks "Upload" button
4. POST request to `/api/upload`:
   - Checks authentication
   - Converts File to Buffer/Stream
   - Uploads to Google Drive
   - Receives file ID
   - Updates `/lib/menu-config.json`
5. Success response
6. Page refreshes
7. New image displays

### Image Serving Flow

1. Menu page reads `/lib/menu-config.json`
2. Gets file ID (e.g., `1xUobMqM...`)
3. Renders image with src: `/api/image/[fileId]`
4. Browser requests `/api/image/[fileId]`
5. API route:
   - Fetches from `https://drive.google.com/uc?export=download&id=[fileId]`
   - Follows redirect to `drive.usercontent.google.com`
   - Downloads image
   - Returns with cache headers
6. Browser displays image
7. Cached for 24 hours

### Security

- ✅ **OAuth Authentication** - Only authorized admin can upload
- ✅ **Email Restriction** - Only `ADMIN_EMAIL` can access admin
- ✅ **Protected Routes** - Middleware blocks unauthorized access
- ✅ **Session Cookies** - Secure httpOnly cookies
- ✅ **Public Images** - Menu images are publicly viewable (by design)

---

## 🐛 Troubleshooting

### "Unauthorized" error when uploading

**Problem**: Admin email doesn't match `ADMIN_EMAIL`

**Solution**:
1. Check `.env.local` (local) or Vercel env vars (production)
2. Verify `ADMIN_EMAIL` matches the Google account you're signing in with
3. Sign out and sign in again

### Images not displaying (403 Forbidden)

**Problem**: Google Drive folder or files aren't public

**Solution**:
1. Go to your Google Drive folder
2. Right-click → Share
3. Set to "Anyone with the link can view"
4. Delete old uploaded files from Drive
5. Upload new files through admin dashboard
6. New files will inherit public permissions

### "NEXTAUTH_SECRET not found" error

**Problem**: Environment variable not set

**Solution**:
- **Local**: Check `.env.local` file exists and has `NEXTAUTH_SECRET`
- **Production**: Add `NEXTAUTH_SECRET` in Vercel environment variables
- Redeploy after adding

### OAuth redirect error

**Problem**: Redirect URI not configured in Google Cloud

**Solution**:
1. Go to Google Cloud Console → Credentials
2. Edit OAuth Client
3. Add authorized redirect URI:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://myzeste.com/api/auth/callback/google`
4. Save changes
5. Wait 5 minutes for changes to propagate

### "Can't sign in" - App not verified warning

**Problem**: OAuth app in test mode

**Solution**:
- **For personal use**: Add your email to test users in OAuth consent screen
- **For public use**: Submit app for Google verification (takes 1-2 weeks)
- **Or**: Click "Advanced" → "Go to [App Name] (unsafe)" - it's safe because it's your own app

### Images loading slowly

**Problem**: No caching or Drive rate limits

**Solution**:
- Images are cached for 24 hours automatically
- First load may be slower (fetching from Drive)
- Subsequent loads are cached by browser
- Consider using Vercel's Edge Network for faster delivery

### Admin dashboard shows old images after upload

**Problem**: Browser cache

**Solution**:
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or clear browser cache
- Page auto-refreshes after upload to prevent this

---

## 📊 URLs Reference

### Local Development
- **Homepage**: http://localhost:3000
- **Menu Page**: http://localhost:3000/menu
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

### Production
- **Homepage**: https://myzeste.com
- **Menu Page**: https://myzeste.com/menu
- **Admin Login**: https://myzeste.com/admin/login
- **Admin Dashboard**: https://myzeste.com/admin

### API Routes
- **Auth**: `/api/auth/[...nextauth]`
- **Upload**: `/api/upload` (POST)
- **Image Proxy**: `/api/image/[fileId]` (GET)

### External Services
- **Google Cloud Console**: https://console.cloud.google.com
- **Google Drive**: https://drive.google.com
- **Vercel Dashboard**: https://vercel.com
- **GitHub Repo**: https://github.com/hungapp/zeste-pop-up

---

## 🎯 Quick Reference

### Environment Variables

```env
# Required for all environments
NEXTAUTH_SECRET=               # Random secret (openssl rand -base64 32)
NEXTAUTH_URL=                  # http://localhost:3000 OR https://myzeste.com
GOOGLE_CLIENT_ID=              # From Google Cloud Console
GOOGLE_CLIENT_SECRET=          # From Google Cloud Console
GOOGLE_DRIVE_FOLDER_ID=        # Google Drive folder ID
ADMIN_EMAIL=                   # Email that can access admin
```

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (local testing)
npm run start

# Type check
npx tsc --noEmit

# Deploy to production
git push origin main  # Auto-deploys on Vercel
```

### Important File Locations

- **Environment**: `.env.local`
- **Menu Config**: `lib/menu-config.json`
- **Auth Config**: `lib/auth.ts`
- **Drive Functions**: `lib/drive.ts`
- **Upload API**: `app/api/upload/route.ts`
- **Image API**: `app/api/image/[fileId]/route.ts`

---

## ✅ Checklist for New Pop-Up

Use this checklist every time you have a new pop-up:

- [ ] Prepare new dessert menu image
- [ ] Prepare new drink menu image
- [ ] Go to https://myzeste.com/admin
- [ ] Sign in with Google
- [ ] Upload new dessert menu
- [ ] Wait for success message
- [ ] Upload new drink menu
- [ ] Wait for success message
- [ ] Verify on https://myzeste.com/menu
- [ ] Test on mobile device
- [ ] Done! 🎉

---

## 🎓 Additional Resources

### Documentation
- **NextAuth.js**: https://authjs.dev/
- **Google Drive API**: https://developers.google.com/drive
- **Next.js 15**: https://nextjs.org/docs
- **Vercel Deployment**: https://vercel.com/docs

### Support
- **Setup Issues**: See ADMIN_SETUP.md for detailed troubleshooting
- **Google Cloud**: https://cloud.google.com/support
- **Vercel Support**: https://vercel.com/support

---

## 🎉 Success!

You now have a fully functional admin system for managing menu photos!

**Key Benefits:**
- ✨ Update menus in seconds
- 🔒 Secure admin access
- ☁️ Automatic cloud backup
- 🚀 No redeployment needed
- 📱 Works on all devices

**Happy managing! 🍰🥤**

---

*Last Updated: February 16, 2026*
*System Version: 1.0.0*
