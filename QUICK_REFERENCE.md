# 🎯 Quick Reference - Wapio Auth System

## 🚀 Getting Started (3 Steps)

### 1️⃣ Fix MongoDB Connection (REQUIRED!)
```
1. Go to: https://cloud.mongodb.com/
2. Select your cluster
3. Click "Network Access" (left sidebar)
4. Click "Add IP Address"
5. Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Click "Confirm"
7. Wait 2-3 minutes
```

### 2️⃣ Start Backend
```bash
cd backend
npm run dev
```
✅ Backend running at: http://localhost:5001

### 3️⃣ Start Frontend (in new terminal)
```bash
cd frontend
npm run dev
```
✅ Frontend running at: http://localhost:5173

## 📝 Test the System

### Option 1: Use the UI (Recommended)
1. Open http://localhost:5173
2. Click "Get Started" button
3. Fill signup form:
   - Name: Test User
   - Email: test@wapio.com
   - Password: Test123456
4. You'll be auto-logged in!

### Option 2: Use API (cURL)
```bash
# Signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@wapio.com","password":"Test123456"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@wapio.com","password":"Test123456"}'
```

## 🔑 Password Requirements
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

Examples:
- ✅ Test123456
- ✅ Welcome1
- ✅ MyPass99
- ❌ test (too short)
- ❌ testtest (no uppercase/number)

## 📍 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Backend | http://localhost:5001 | API server |
| Login | http://localhost:5173/login | Login page |
| Signup | http://localhost:5173/signup | Registration page |
| Dashboard | http://localhost:5173/dashboard | Protected page |
| Health Check | http://localhost:5001/api/health | API status |

## 🔗 API Endpoints

### Public Endpoints
```
POST /api/auth/signup     - Register new user
POST /api/auth/login      - Login user
GET  /api/health          - Health check
```

### Protected Endpoints (require token)
```
GET  /api/auth/me              - Get profile
PUT  /api/auth/profile         - Update profile  
PUT  /api/auth/change-password - Change password
POST /api/auth/logout          - Logout
```

## 🔐 Authentication Flow

### When User Signs Up/Logs In:
1. Token saved to localStorage
2. User data saved to localStorage
3. AuthContext updated
4. Redirected to dashboard

### When Accessing Protected Route:
1. Check if token exists
2. If yes → allow access
3. If no → redirect to login

### When Token Expires:
1. API returns 401
2. Auto logout
3. Redirect to login

## 📁 Key Files

### Backend
```
backend/
├── server.js                    # Main server
├── .env                         # Config (PORT=5001)
├── config/db.js                 # MongoDB connection
├── models/User.model.js         # User schema
├── routes/auth.routes.js        # Auth routes
├── controllers/auth.controller.js # Auth logic
└── middleware/
    ├── auth.middleware.js       # JWT verification
    ├── validation.middleware.js # Input validation
    └── error.middleware.js      # Error handling
```

### Frontend
```
frontend/
├── .env                        # Config (API URL)
├── src/
    ├── pages/
    │   ├── Login.jsx           # Login page
    │   └── Signup.jsx          # Signup page
    ├── contexts/
    │   └── AuthContext.jsx     # Global auth state
    ├── components/
    │   └── ProtectedRoute.jsx  # Route protection
    └── lib/
        └── api.js              # API utilities
```

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem:** "Could not connect to any servers"
**Solution:** Whitelist IP in MongoDB Atlas (see step 1 above)

### Port Already in Use
**Problem:** "EADDRINUSE: address already in use"
**Solution:** 
```bash
# Kill process on port 5001 (backend)
lsof -ti:5001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Token Invalid/Expired
**Problem:** "Invalid or expired token"
**Solution:** User will be auto-logged out and redirected to login

### CORS Error
**Problem:** Frontend can't connect to backend
**Solution:** Check backend .env has `FRONTEND_URL=http://localhost:5173`

## ✨ Features

### ✅ Implemented
- User registration
- User login
- Password hashing (bcrypt)
- JWT authentication
- Protected routes
- Token management
- Auto logout on invalid token
- Rate limiting (login: 5/15min)
- Input validation
- Error handling
- Beautiful UI matching theme
- Toast notifications
- Loading states
- Responsive design

### 📋 Ready to Add Next
- Password reset via email
- Email verification
- Social login (Google, Facebook)
- Two-factor authentication
- User avatar upload
- Admin panel
- Campaign management
- Contact management

## 💾 Environment Variables

### Backend (.env)
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=wapio_super_secret_key...
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
```

## 🎨 UI Theme Colors

Primary: Green (#10B981 / #22C55E)
Background: White with green gradients
Text: Gray-900 for primary, Gray-600 for secondary
Buttons: Green with black borders and shadow

## 📞 Support

For issues or questions:
1. Check SETUP_GUIDE.md
2. Check AUTH_IMPLEMENTATION.md
3. Check backend/README.md

## 🎉 You're Ready!

✅ Backend configured
✅ Frontend configured
✅ Auth system complete
✅ Documentation ready

**Just whitelist your IP in MongoDB Atlas and you're good to go!**

---

Last Updated: December 2024
Version: 1.0.0
