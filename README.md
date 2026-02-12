# Flipkart-style Ecommerce Frontend

This repo is configured for **public deployment from GitHub** using **GitHub Pages**.

## One-time GitHub setup
1. Push this repository to GitHub.
2. Ensure your default branch is `main` (or adjust `.github/workflows/deploy-pages.yml`).
3. In GitHub repository settings:
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from **Actions**).

After the workflow succeeds, your site will be publicly available at:
- `https://<your-github-username>.github.io/<repo-name>/`

## Local run
```bash
npm run build
npm run start
```
Then open `http://127.0.0.1:4173`.

## Scripts
- `npm run start` → localhost launch
- `npm run start:network` → bind all interfaces
- `npm run start:prod` → bind `0.0.0.0:8080`
