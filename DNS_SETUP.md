# DNS Configuration Instructions for www.giorbalitour.com

## Step 1: GitHub Pages Settings
1. Go to: https://github.com/GiorMalik/GiorBaliTour/settings/pages
2. Under "Custom domain", enter: `www.giorbalitour.com`
3. Click "Save"
4. Wait for GitHub to verify (may take a few minutes)

## Step 2: DNS Configuration (at your domain registrar)

### Option A: If you use Cloudflare (Recommended)
1. Log in to your Cloudflare account
2. Select your domain `giorbalitour.com`
3. Add DNS record:
   - Type: `CNAME`
   - Name: `www`
   - Target: `giormalik.github.io`
   - Proxy status: Enabled (orange cloud)
   - TTL: Auto

### Option B: If you use other DNS providers (GoDaddy, Namecheap, etc.)
1. Log in to your domain registrar
2. Go to DNS management for `giorbalitour.com`
3. Add DNS record:
   - Type: `CNAME`
   - Name: `www`
   - Target: `giormalik.github.io`
   - TTL: 1 hour (or default)

### Option C: If you want to redirect non-www to www
Add additional DNS record:
- Type: `CNAME`
- Name: `@` (or blank)
- Target: `www.giorbalitour.com`
- TTL: 1 hour

## Step 3: Verification
After DNS changes (can take 24-48 hours to propagate):
1. Check: https://www.giorbalitour.com
2. Should show your Bali Tour website
3. Check SSL certificate (should be automatic with GitHub Pages)

## Current Configuration Status
✅ CNAME file created and pushed to GitHub
✅ Next.js configured for custom domain
✅ SEO metadata updated to www.giorbalitour.com
✅ Build completed with new domain settings
✅ All asset paths use root domain (no /GiorBaliTour/ prefix)

## URLs After Setup
- GitHub Pages: https://giormalik.github.io/GiorBaliTour (will redirect)
- Custom Domain: https://www.giorbalitour.com (primary)
- Old redirects: giormalik.github.io → www.giorbalitour.com

## Troubleshooting
- If site doesn't load: Check DNS propagation using https://www.whatsmydns.net
- If certificate error: Wait longer for SSL to provision
- If 404 error: Check GitHub Pages settings for custom domain verification