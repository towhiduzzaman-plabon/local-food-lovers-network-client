
Local Food Lovers Network

A full-stack MERN application for discovering local food, sharing reviews, favoriting dishes, and making “Buy” snapshot purchases.
Client: React + Vite + Tailwind CSS + DaisyUI + React Query + Firebase Auth
Server: Express + MongoDB + Firebase Admin (verify ID token → issue secure session cookie)
✨ Features
🔐 Firebase Auth (Email/Password + Google) → server session via httpOnly cookie
🧾 Reviews: CRUD, search, featured top-6
❤️ Favorites: add / list / delete per user
🛒 Purchases: “Buy Now” snapshot + “My Purchases”
🖼️ Image fallbacks, toast notifications, loader component
🛡️ Production-ready CORS (multi-origin), Helmet, and logging (morgan)

📁 Project Structure
local-food-lovers-network/
├─ client/                   # Vite React app
│  ├─ src/
│  │  ├─ components/         # Navbar, Footer, ReviewCard, RatingStars, Loader, etc.
│  │  ├─ context/            # AuthProvider (Firebase)
│  │  ├─ lib/                # axios base, firebase.config
│  │  ├─ pages/              # Home, AllReviews, ReviewDetails, Add/Edit, MyReviews, Favorites, Purchases, Login, Register, Profile, NotFound
│  │  ├─ providers/          # QueryProvider
│  │  ├─ routes/             # Router
│  │  └─ utils/              # PrivateRoute, avatar helpers
│  └─ .env.example
│
└─ server/                   # Express API
   ├─ routes/                # auth.routes, reviews.routes, favorites.routes, purchases.routes
   ├─ middleware/            # verifyJWT
   ├─ utils/                 # pick.js (if used)
   ├─ db.js                  # Mongo connection + collection helpers
   └─ index.js               # app bootstrap

🚀 Quick Start
Prerequisites
Node.js 18+
MongoDB Atlas connection string
Firebase project & Web App (client auth)
Server: Firebase Admin credentials via environment variables (no JSON file committed)
git clone <your-repo-url>
cd local-food-lovers-network

# client
cd client
npm i

# server
cd ../server
npm i

⚙️ Environment Variables
Server — server/.env
PORT=3000

# Comma-separated allowed origins (dev + prod)
CLIENT_URL=http://localhost:5173,https://your-client.web.app,https://your-client.firebaseapp.com

MONGODB_URI="YOUR_MONGODB_ATLAS_URI"
DB_NAME=sample_mflix
REVIEWS_COLL=food_details
FAVORITES_COLL=favorites

# Dev only (optional): allow self-signed TLS
ALLOW_INSECURE_TLS=false

# Cookie/JWT settings
JWT_SECRET=change_me
JWT_EXPIRES=7d
COOKIE_SECURE=false   # set true in production (HTTPS)

# Firebase Admin credentials as env (recommended for Vercel)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
# IMPORTANT: multiline key with \n escapes
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n

Client — client/.env
VITE_API_URL=http://localhost:3000        # replace with deployed API URL in production
VITE_SITE_NAME=Local Food Lovers Network

# Firebase client config
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

🧪 Run in Development

Server
cd server
npm run dev
# http://localhost:3000

Client
cd client
npm run dev
# http://localhost:5173

🗄️ MongoDB Collections
Database: DB_NAME (default: sample_mflix)
Collections:
REVIEWS_COLL (default: food_details)
FAVORITES_COLL (default: favorites)
purchases (created by purchases routes)

Typical food_details document
{
  "_id": { "$oid": "..." },
  "foodName": "Kacchi Biryani",
  "foodImage": "https://...",
  "restaurantName": "Sultan's Dine",
  "location": "Dhaka",
  "starRating": 4.8,
  "reviewText": "...",
  "userEmail": "user@example.com",
  "date": "2025-11-01T13:05:00Z",
  "price": 450
}

🔌 API Endpoints (Overview)
Base: http://localhost:3000/api (dev) / https://<your-api-domain>/api (prod)

Health
GET /ping → { ok: true }
GET /health → { ok, db, port }
Auth
POST /auth/session { idToken } → set session cookie
POST /auth/logout → clear cookie
Reviews
GET /reviews?q=&page=&limit= — list/search
GET /reviews/featured — top-6
GET /reviews/:id
POST /reviews (auth)
PUT /reviews/:id (auth, owner)
DELETE /reviews/:id (auth, owner)

Favorites (auth)
POST /favorites { reviewId, foodName, restaurantName, foodImage }
GET /favorites/me
DELETE /favorites/:id
Purchases (auth)
POST /purchases { reviewId } — buy snapshot
GET /purchases/mine

🧱 Front-End Routes
/ — Home (banner, featured, promos)
/reviews — All reviews + search + “See more”
/reviews/:id — Details + Buy Now
/add — Add review (auth)
/edit/:id — Edit (owner)
/my-reviews — My reviews (auth)
/favorites — My favorites (auth)
/purchases — My purchases (auth)
/login, /register — Auth pages
/profile — Profile card

* — NotFound
# client
cd client
npm run build   # outputs to client/dist

# server
# plain Node server — no build step required


☁️ Deployment
API (Server) — Vercel
Create a Vercel project (Framework: Other / Node), root = server/.
Add Environment Variables from server/.env (no quotes).
Deploy → note API URL, e.g. https://local-food-lovers-api.vercel.app.
Update client/.env → VITE_API_URL=<that URL> and rebuild the client.
Web (Client) — Firebase Hosting

cd client
npm run build
firebase init hosting    # select existing Firebase project
# Public directory: dist
# Configure as SPA: Yes
firebase deploy

🛡️ Security Notes
In production:
COOKIE_SECURE=true (HTTPS only)
CLIENT_URL must include your live client domain(s)
Never commit service account JSON—use env variables
Validate ownership on update/delete endpoints
Re-validate all client input on the server
🧰 NPM Scripts
Client (client/package.json)
dev – Vite dev server
build – production build
preview – preview built app
Server (server/package.json)
dev – nodemon
start – node







