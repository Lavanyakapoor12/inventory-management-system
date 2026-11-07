# Updated Inventory Frontend

## 1. Replace your frontend source files
Copy the contents of this folder into your existing `frontend` folder. Keep your existing `package.json`, Dockerfile and configuration files.

## 2. Set the Vercel environment variable
In Vercel:
1. Open your project.
2. Go to Settings → Environment Variables.
3. Add `VITE_API_URL` with value:
   `https://inventory-management-system-1-ht93.onrender.com`
4. Select Production (and Preview/Development if you want).
5. Save.

## 3. Build and deploy
From the `frontend` folder run:
```bash
npm install
npm run build
```
Commit and push the updated frontend files to GitHub. Vercel should start a new deployment automatically.

## Important
The frontend uses the Render API URL as a fallback too, but setting `VITE_API_URL` in Vercel is recommended. If the browser reports a CORS error, update the FastAPI CORS `allow_origins` setting to include your exact Vercel domain.
