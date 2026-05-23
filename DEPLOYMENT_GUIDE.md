# Family Financial Recovery Vault — Deployment Guide
## + Adding the Donation Card

---

## Part 1 — Add the Donation Card to App.js

Open `App_additions.jsx` (the other file from this bundle) and follow the 4 numbered steps
inside it:

| Step | What to do |
|------|------------|
| 1 | Add 6 icon names to your existing `lucide-react` import |
| 2 | Copy the CSS block into `App.css` (or `index.css`) |
| 3 | Paste the `DonationCard` component above your `App()` function |
| 4 | Replace your `DownloadView` function with the updated version |

Then update the three constants at the top of `DonationCard`:

```js
const UPI_ID       = "yourname@upi";           // your actual UPI ID
const BMC_URL      = "https://buymeacoffee.com/yourusername";
const PAYPAL_URL   = "https://paypal.me/yourusername";
const RAZORPAY_URL = "https://rzp.io/l/yourlink";  // create free at razorpay.me
```

---

## Part 2 — Local build (required before any deployment)

```bash
cd frontend
npm install          # install dependencies (first time only)
npm run build        # creates the `build/` folder
```

Test the production build locally:
```bash
npx serve -s build   # visit http://localhost:3000
```

---

## Part 3 — Choose a deployment platform

### Option A — Netlify (recommended, easiest)

**Method 1 — Drag and drop (no account linking needed):**
1. Go to https://app.netlify.com/drop
2. Drag your `frontend/build` folder into the browser window
3. Netlify gives you a URL in ~30 seconds — done

**Method 2 — Git integration (auto-deploys on every push):**
1. Push your project to a GitHub/GitLab repo
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
3. Connect your repo
4. Set these build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Copy `netlify.toml` (from this bundle) to the ROOT of your repo
6. Click "Deploy site"

Your app redeploys automatically on every `git push`.

---

### Option B — Vercel (also free, also excellent)

1. Push your project to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Set "Root directory" to `frontend`
5. Vercel auto-detects Create React App — leave other settings as-is
6. Click "Deploy"
7. Copy `vercel.json` (from this bundle) to `frontend/vercel.json`

Custom domain: Vercel dashboard → your project → Settings → Domains → add your domain.

---

### Option C — GitHub Pages (free, needs a bit more setup)

1. In your repo, go to **Settings → Pages**
2. Under "Source", choose **GitHub Actions**
3. Copy the workflow file from this bundle:
   ```
   .github/workflows/deploy.yml  →  into your repo at the same path
   ```
4. Edit line 44 of the workflow — replace `YOUR_REPO_NAME` with your actual repo name:
   ```yaml
   PUBLIC_URL: /your-actual-repo-name
   ```
5. Also add this to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```
6. Push to `main` — the action builds and deploys automatically
7. Your app is live at `https://yourusername.github.io/your-repo-name`

---

## Part 4 — Custom domain (optional, all platforms)

If you own a domain (e.g. from GoDaddy, Namecheap, Google Domains):

**Netlify:** Dashboard → Domain management → Add custom domain → follow DNS instructions  
**Vercel:** Dashboard → Settings → Domains → add your domain  
**GitHub Pages:** Repo Settings → Pages → Custom domain field → add `yourdomain.com`
Then add a CNAME record in your DNS: `www` → `yourusername.github.io`

---

## Part 5 — Donation platform setup

### UPI (simplest for Indian users — zero setup)
Your UPI ID is already set in the app. Users just copy it and open any UPI app.
No account or setup needed — works with GPay, PhonePe, Paytm, BHIM.

### Buy Me a Coffee (international + cards)
1. Sign up at https://buymeacoffee.com
2. Complete your profile and add a payout method
3. Your link is `https://buymeacoffee.com/yourusername`
4. Paste it into `BMC_URL` in the app

### Razorpay Payment Page (India — cards, net banking, UPI)
1. Create a free account at https://razorpay.com
2. Go to **Payment Links → Payment Pages → Create payment page**
3. Set it as "Pay what you want" (variable amount)
4. Publish → copy the `rzp.io` short link
5. Paste into `RAZORPAY_URL` in the app
No GST registration needed for small personal donations.

### PayPal
1. Sign up at https://paypal.com
2. Your link is `https://paypal.me/yourusername` (set your username in PayPal settings)
3. Paste into `PAYPAL_URL`
Note: PayPal availability and fees vary by country.

---

## Checklist before going live

- [ ] Run `npm run build` and test with `npx serve -s build`
- [ ] Replaced all 4 placeholder values in `DonationCard`
- [ ] Verified donation links open correctly in a browser
- [ ] Chose a deployment platform and deployed
- [ ] Tested the live URL on mobile and desktop
- [ ] (Optional) Set up a custom domain

---

## Security note

This app stores data only in the user's browser (no server, no database).
The CSP headers in `netlify.toml` / `vercel.json` block all external data connections,
which is the right call for a family privacy tool.

Never add analytics scripts, ad trackers, or third-party cookies to this app.
