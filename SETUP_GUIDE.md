# Zeshan Pure Harvest — Dynamic Admin-Driven Website
## Complete Setup Guide

---

## 📁 Folder Structure

```
zeshan-pure-harvest/
├── backend/                  # Node.js Express API
│   ├── server.js             # Main server with all routes
│   ├── package.json
│   └── .env                  # Backend env (already configured)
├── src/
│   ├── components/           # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── AdminLayout.tsx
│   │   └── AdminRoute.tsx
│   ├── context/
│   │   ├── AuthContext.tsx   # Supabase auth + admin check
│   │   └── CartContext.tsx   # Shopping cart state
│   ├── hooks/
│   │   └── useData.ts        # TanStack Query hooks for all data
│   ├── lib/
│   │   └── api.ts            # Axios API client + upload helper
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts     # Supabase browser client
│   │       └── types.ts      # Typed database schema
│   ├── pages/
│   │   ├── Index.tsx         # Homepage
│   │   ├── Login.tsx         # Auth page
│   │   ├── Dashboard.tsx     # Admin dashboard overview
│   │   └── admin/
│   │       ├── ProductsAdmin.tsx
│   │       ├── AboutAdmin.tsx
│   │       ├── BenefitsAdmin.tsx
│   │       ├── GalleryAdmin.tsx
│   │       ├── MessagesAdmin.tsx
│   │       └── SettingsAdmin.tsx
│   ├── App.tsx               # Routes + providers
│   └── data/
│       └── products.ts       # Shared Product type
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env                      # Frontend env (already configured)
├── .env.example
└── package.json
```

---

## 🛠 Supabase Setup

### 1. Your Supabase Project (Already Created)
- **URL**: `https://eglhdxesejntmxdnsntf.supabase.co`
- **Anon Key**: Already in `.env`
- **Service Role Key**: Already in `backend/.env`

### 2. Run the Database Migration
1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project → SQL Editor
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click **Run**
4. This creates:
   - `products` table
   - `about` table
   - `benefits` table
   - `gallery` table
   - `messages` table
   - `site_settings` table
   - Default seed data

### 3. Create Storage Bucket
1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Name: `images`
4. Set **Public bucket** = ON
5. Click **Save**

### 4. Set up Auth
1. Go to **Authentication** → **Users**
2. Sign up via your frontend at `/login`
3. After signing up, go to the user in dashboard and **Confirm email** (or use the email confirmation link)
4. Add your email to the `adminEmails` array in `src/context/AuthContext.tsx`:
   ```ts
   const adminEmails = ["sheikhuqamar@gmail.com", "admin@zeshandryfruit.com"];
   ```

---

## 🖥 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend Server
```bash
npm run dev
```
Server runs on `http://localhost:3001`

---

## ⚛️ Frontend Setup

### 1. Install Dependencies (if not already)
```bash
npm install
```

### 2. Start Frontend
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

### Frontend `.env`
```env
VITE_SUPABASE_URL=https://eglhdxesejntmxdnsntf.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:3001/api
```

### Backend `backend/.env`
```env
SUPABASE_URL=https://eglhdxesejntmxdnsntf.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
FRONTEND_URL=http://localhost:5173
PORT=3001
```

---

## 🚀 Deployment

### Deploy Backend (Render/Railway/VPS)
1. Push code to GitHub
2. Connect repo to Render/Railway
3. Set environment variables from `backend/.env`
4. Start command: `node server.js`

### Deploy Frontend (Vercel/Netlify)
1. Connect repo to Vercel/Netlify
2. Set environment variables from `.env`
3. Build command: `npm run build`
4. Output directory: `dist`

### Update API URL
After deploying backend, update `VITE_API_URL` in your deployed frontend to point to your live backend URL.

---

## ✅ Feature Checklist

| Feature | Status |
|---------|--------|
| Supabase Auth (login/signup) | ✅ Working |
| Admin-only dashboard | ✅ Working |
| Product CRUD | ✅ Working |
| About section editor | ✅ Working |
| Benefits CRUD | ✅ Working |
| Gallery CRUD | ✅ Working |
| Contact form (stores messages) | ✅ Working |
| Messages inbox | ✅ Working |
| Hero settings editor | ✅ Working |
| Image uploads to Supabase Storage | ✅ Working |
| Dark/Light mode toggle | ✅ Working |
| Responsive design | ✅ Working |
| Dynamic frontend data | ✅ Working |

---

## 🔧 Troubleshooting

### "Unauthorized" errors
- Make sure you're logged in as an admin email
- Check that backend `.env` has correct `SUPABASE_SERVICE_ROLE_KEY`

### Images not uploading
- Verify `images` bucket exists in Supabase Storage
- Ensure bucket is set to **Public**

### Database errors
- Re-run the migration SQL in Supabase SQL Editor
- Check RLS policies if data is not returning

### CORS errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL exactly

---

## 📞 Support

For issues contact: **sheikhuqamar@gmail.com**

