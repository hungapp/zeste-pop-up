# Zeste Pop-Up Menu Website

Website for Zeste pop-up restaurant with admin dashboard for menu management.

## 🌐 Live Site

**Production**: https://myzeste.com

## ✨ Features

- Modern Next.js 15 website with React Server Components
- Admin dashboard for managing menu photos
- Google Drive integration for image storage
- Google OAuth authentication
- Automatic image caching and optimization
- Mobile-responsive design
- No redeployment needed for menu updates

## 📚 Documentation

- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Complete setup guide (START HERE)
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment checklist
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Detailed admin setup
- **[PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)** - Production configuration
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Cloud account
- Google Drive folder (public)
- Admin Google account

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/hungapp/zeste-pop-up.git
   cd zeste-pop-up
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin

### Production

See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) for full deployment instructions.

## 📁 Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── menu/               # Menu page
│   └── about/              # About page
├── components/             # React components
├── lib/                    # Utilities & config
├── public/                 # Static assets
└── types/                  # TypeScript types
```

## 🔐 Admin Access

**URL**: https://myzeste.com/admin

**Login**: Google OAuth (restricted to configured admin email)

**Features**:
- Upload dessert menu photos
- Upload drink menu photos
- View current menus
- Automatic backup to Google Drive

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.9
- **React**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: NextAuth.js v5
- **Storage**: Google Drive API
- **Deployment**: Vercel
- **Forms**: React Hook Form + Zod

## 📝 Environment Variables

Required environment variables:

```env
NEXTAUTH_SECRET=           # Random secret
NEXTAUTH_URL=              # Site URL
GOOGLE_CLIENT_ID=          # OAuth Client ID
GOOGLE_CLIENT_SECRET=      # OAuth Client Secret
GOOGLE_DRIVE_FOLDER_ID=    # Drive folder ID
ADMIN_EMAIL=               # Admin email address
```

See `.env.local.example` for template.

## 🎯 Usage

### Updating Menu for New Pop-Up

1. Go to https://myzeste.com/admin
2. Sign in with Google
3. Upload new dessert menu image
4. Upload new drink menu image
5. Done! Menu updates instantly ✨

No code changes or redeployment needed!

## 🐛 Troubleshooting

See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) for comprehensive troubleshooting guide.

### Common Issues:

- **Can't sign in**: Check ADMIN_EMAIL matches your Google account
- **Images not loading**: Ensure Google Drive folder is public
- **403 errors**: Make sure OAuth redirect URIs are configured

## 🤝 Contributing

This is a private project for Zeste restaurant.

## 📄 License

Private - All rights reserved

## 👥 Team

- **Development**: hungapp
- **Design**: Zeste team
- **Content**: Zeste team

## 📧 Support

For technical issues or questions about the admin system, see the documentation files listed above.

---

**Built with ❤️ for Zeste Pop-Up**
