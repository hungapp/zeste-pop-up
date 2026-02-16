# Deployment Commands Reference

Quick reference for deploying updates to production.

## 📦 Before Deployment

### Check Everything Works Locally

```bash
# Start development server
npm run dev

# Test the following:
# - Homepage: http://localhost:3000
# - Menu page: http://localhost:3000/menu
# - Admin login: http://localhost:3000/admin/login
# - Admin dashboard: http://localhost:3000/admin
# - Upload functionality

# Build for production (test for errors)
npm run build

# Run production build locally
npm run start
```

## 🚀 Deploy to Production

### Standard Deployment (Automatic)

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Update menu management system

- [Describe what you changed]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub (triggers Vercel deployment)
git push origin main
```

**Vercel will automatically**:
1. Detect the push
2. Build the project
3. Run checks
4. Deploy to production
5. Update https://myzeste.com

**Deployment time**: ~2-3 minutes

### Check Deployment Status

**Option 1: Vercel Dashboard**
1. Go to https://vercel.com
2. Select "zeste-pop-up" project
3. View latest deployment status

**Option 2: GitHub**
1. Go to https://github.com/hungapp/zeste-pop-up
2. See deployment status badge on commits

### Verify Production Deployment

```bash
# Check if site is live
curl -I https://myzeste.com

# Should return: HTTP/2 200
```

**Manual verification**:
1. Visit https://myzeste.com
2. Check menu page: https://myzeste.com/menu
3. Test admin: https://myzeste.com/admin
4. Upload test image
5. Verify on mobile device

## 🔄 Update Environment Variables

### In Vercel Dashboard

1. Go to https://vercel.com
2. Select project → Settings → Environment Variables
3. Update variable value
4. **Important**: Redeploy to apply changes

### Redeploy After Env Var Changes

**Option 1: Trigger new deployment**
```bash
# Make a small change (e.g., update README)
git commit --allow-empty -m "Redeploy to apply env var changes"
git push origin main
```

**Option 2: Use Vercel dashboard**
1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

## 🔙 Rollback Deployment

### Revert to Previous Version

**Option 1: Vercel Dashboard (Fastest)**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Option 2: Git Revert**
```bash
# Find the commit to revert to
git log --oneline

# Revert to that commit
git revert HEAD

# Push
git push origin main
```

## 🧪 Deploy to Preview/Staging

### Preview Deployment (Test Branch)

```bash
# Create feature branch
git checkout -b feature/test-changes

# Make changes and commit
git add .
git commit -m "Test changes"

# Push to GitHub
git push origin feature/test-changes
```

Vercel will create a preview deployment with unique URL (e.g., `zeste-pop-up-abc123.vercel.app`)

### Test Preview
1. Go to Vercel dashboard
2. Find preview deployment URL
3. Test thoroughly before merging to main

### Merge to Production
```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/test-changes

# Push to production
git push origin main

# Delete feature branch (optional)
git branch -d feature/test-changes
git push origin --delete feature/test-changes
```

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] No TypeScript errors
- [ ] All features working
- [ ] Environment variables set in Vercel
- [ ] Google OAuth redirect URIs configured

### Deployment
- [ ] Code committed to Git
- [ ] Pushed to GitHub main branch
- [ ] Vercel deployment triggered
- [ ] Build completed successfully
- [ ] No build errors in Vercel logs

### Post-Deployment
- [ ] Site loads: https://myzeste.com
- [ ] Menu page works: https://myzeste.com/menu
- [ ] Admin login works: https://myzeste.com/admin
- [ ] Can upload images
- [ ] Images display correctly
- [ ] Tested on mobile
- [ ] No console errors

## 🐛 Troubleshooting Deployments

### Build Fails

**Check Vercel logs**:
1. Go to deployment in Vercel
2. Click "View Build Logs"
3. Look for error messages

**Common issues**:
- Missing environment variables
- TypeScript errors
- Missing dependencies
- Invalid configuration

**Fix**:
```bash
# Test build locally
npm run build

# Fix errors, then deploy again
git add .
git commit -m "Fix build errors"
git push origin main
```

### Deployment Succeeds But Site Broken

**Check Runtime logs**:
1. Go to deployment in Vercel
2. Click "Runtime Logs"
3. Look for errors

**Common issues**:
- Wrong environment variables
- API route errors
- Missing files

**Fix**:
1. Update environment variables in Vercel
2. Redeploy
3. Check logs again

### "Site Not Found" Error

**Possible causes**:
- Domain not configured
- Deployment in progress
- Vercel issues

**Fix**:
1. Check Vercel dashboard for deployment status
2. Verify domain settings in Vercel
3. Wait 5-10 minutes and try again

## 📝 Useful Git Commands

```bash
# Check status
git status

# View recent commits
git log --oneline -10

# View changes before committing
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View remote URL
git remote -v
```

## 🔗 Quick Links

- **Production Site**: https://myzeste.com
- **Admin Dashboard**: https://myzeste.com/admin
- **GitHub Repo**: https://github.com/hungapp/zeste-pop-up
- **Vercel Dashboard**: https://vercel.com
- **Google Cloud Console**: https://console.cloud.google.com

## 📞 Emergency Contacts

**Site Down**:
1. Check Vercel status: https://www.vercel-status.com
2. Check deployment logs
3. Rollback to previous version

**Can't Deploy**:
1. Check GitHub repository access
2. Check Vercel connection to GitHub
3. Try manual deployment in Vercel

**Other Issues**:
- See SETUP_COMPLETE.md for troubleshooting
- Check Vercel documentation
- Review deployment logs

---

**Keep this handy for quick deployment reference!** 🚀
