# ✅ Setup Checklist - Wapio Authentication System

Use this checklist to ensure everything is properly configured and working.

## 📋 Pre-Installation

- [ ] Node.js installed (v16 or higher)
  ```bash
  node --version  # Should show v16.x.x or higher
  ```

- [ ] npm installed
  ```bash
  npm --version  # Should show 8.x.x or higher
  ```

- [ ] MongoDB Atlas account created
  - Go to: https://cloud.mongodb.com/
  - Sign up if needed

## 🔧 Backend Setup

### Installation
- [ ] Navigate to backend directory
  ```bash
  cd backend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```
  - Should install ~153 packages
  - No vulnerabilities should be found

### Configuration
- [ ] `.env` file exists in `backend/` directory
  
- [ ] MongoDB URI is configured in `.env`
  ```env
  MONGODB_URI=mongodb+srv://...
  ```

- [ ] JWT Secret is set in `.env`
  ```env
  JWT_SECRET=wapio_super_secret_key...
  ```

- [ ] Port is set to 5001 in `.env`
  ```env
  PORT=5001
  ```

- [ ] Frontend URL is configured in `.env`
  ```env
  FRONTEND_URL=http://localhost:5173
  ```

### MongoDB Atlas Configuration ⚠️ CRITICAL
- [ ] Logged into MongoDB Atlas
- [ ] Selected correct cluster
- [ ] Clicked "Network Access" in left sidebar
- [ ] Clicked "Add IP Address"
- [ ] Added 0.0.0.0/0 (Allow from anywhere)
- [ ] Clicked "Confirm"
- [ ] **Waited 2-3 minutes** for changes to propagate

### Testing Backend
- [ ] Start backend server
  ```bash
  npm run dev
  ```

- [ ] Server starts successfully
  - Should see: "🚀 Wapio Backend Server Running"
  - Should show: "Port: 5001"

- [ ] MongoDB connection successful
  - Should see: "✅ MongoDB Connected: cluster0..."
  - Should NOT see: "❌ MongoDB Connection Error"

- [ ] Health check works
  ```bash
  curl http://localhost:5001/api/health
  ```
  - Should return: `{"success":true,"message":"Server is running",...}`

## 🎨 Frontend Setup

### Configuration
- [ ] `.env` file exists in `frontend/` directory

- [ ] API URL is configured in frontend `.env`
  ```env
  VITE_API_URL=http://localhost:5001/api
  ```

### Testing Frontend
- [ ] Start frontend server (in new terminal)
  ```bash
  cd frontend
  npm run dev
  ```

- [ ] Server starts successfully
  - Should see: "Local: http://localhost:5173"

- [ ] Open browser to http://localhost:5173
  - [ ] Homepage loads
  - [ ] Header shows "Login" and "Get Started" buttons
  - [ ] No console errors

## 🔐 Authentication Testing

### Signup Flow
- [ ] Navigate to http://localhost:5173
- [ ] Click "Get Started" button
- [ ] Signup page loads correctly
- [ ] Fill in the form:
  - [ ] Name: Test User
  - [ ] Email: test@wapio.com
  - [ ] Password: Test123456
  - [ ] Confirm Password: Test123456
  - [ ] Check "I agree to terms"
- [ ] Click "Create Account"
- [ ] Success toast appears: "Account created successfully!"
- [ ] Automatically redirected to /dashboard
- [ ] Dashboard loads (protected route)

### Login Flow
- [ ] Click logout (if logged in)
- [ ] Navigate to http://localhost:5173/login
- [ ] Login page loads correctly
- [ ] Fill in credentials:
  - [ ] Email: test@wapio.com
  - [ ] Password: Test123456
- [ ] Click "Sign In"
- [ ] Success toast appears: "Login successful!"
- [ ] Redirected to /dashboard
- [ ] Dashboard loads

### Protected Routes
- [ ] While logged in, access /dashboard
  - [ ] Loads successfully
  
- [ ] While logged in, access /dashboard/templates
  - [ ] Loads successfully
  
- [ ] While logged in, access /dashboard/send
  - [ ] Loads successfully

- [ ] Logout
- [ ] Try to access /dashboard
  - [ ] Automatically redirected to /login
  
- [ ] Try to access /dashboard/templates
  - [ ] Automatically redirected to /login

### Token Persistence
- [ ] Login successfully
- [ ] Refresh the browser page
  - [ ] Still logged in
  - [ ] Dashboard still accessible
  
- [ ] Close browser
- [ ] Open browser again
- [ ] Go to http://localhost:5173/dashboard
  - [ ] Still logged in (token persisted in localStorage)

## 🧪 API Testing (Optional but Recommended)

### Signup API
- [ ] Test signup endpoint
  ```bash
  curl -X POST http://localhost:5001/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"name":"API Test","email":"api@test.com","password":"Test123456"}'
  ```
  - [ ] Returns 201 status
  - [ ] Returns `"success": true`
  - [ ] Returns user object
  - [ ] Returns JWT token

### Login API
- [ ] Test login endpoint
  ```bash
  curl -X POST http://localhost:5001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"api@test.com","password":"Test123456"}'
  ```
  - [ ] Returns 200 status
  - [ ] Returns `"success": true`
  - [ ] Returns user object
  - [ ] Returns JWT token

### Protected Endpoint
- [ ] Get token from login response
- [ ] Test protected endpoint
  ```bash
  curl -X GET http://localhost:5001/api/auth/me \
    -H "Authorization: Bearer YOUR_TOKEN_HERE"
  ```
  - [ ] Returns 200 status
  - [ ] Returns user profile

- [ ] Test without token
  ```bash
  curl -X GET http://localhost:5001/api/auth/me
  ```
  - [ ] Returns 401 status
  - [ ] Returns error message

### Rate Limiting
- [ ] Try to login 6 times with wrong password
  - [ ] After 5 attempts, should get rate limit error
  - [ ] Error message: "Too many login attempts"

## 🔍 Error Handling

### Invalid Credentials
- [ ] Try to login with wrong password
  - [ ] Shows error toast: "Invalid credentials"
  - [ ] Doesn't redirect
  - [ ] Password field cleared

### Validation Errors
- [ ] Try to signup with invalid email
  - [ ] Shows validation error
  
- [ ] Try to signup with short password (< 6 chars)
  - [ ] Shows validation error
  
- [ ] Try to signup with password missing uppercase
  - [ ] Shows validation error

### Duplicate Account
- [ ] Try to signup with existing email
  - [ ] Shows error: "User with this email already exists"

## 🎨 UI/UX Verification

### Design
- [ ] Pages use green theme (#10B981)
- [ ] Consistent styling across pages
- [ ] Beautiful gradient backgrounds
- [ ] Icons display correctly (Lucide React)

### Responsiveness
- [ ] Test on desktop (> 1024px)
  - [ ] All elements visible
  - [ ] Navigation works
  
- [ ] Test on tablet (768px - 1024px)
  - [ ] Layout adjusts
  - [ ] Mobile menu appears
  
- [ ] Test on mobile (< 768px)
  - [ ] Mobile menu works
  - [ ] Forms are usable
  - [ ] Buttons are clickable

### User Feedback
- [ ] Toast notifications appear for all actions
- [ ] Loading spinners show during API calls
- [ ] Password visibility toggle works
- [ ] Form validation shows in real-time

## 📁 File Verification

### Backend Files
- [ ] `backend/server.js` exists
- [ ] `backend/config/db.js` exists
- [ ] `backend/models/User.model.js` exists
- [ ] `backend/controllers/auth.controller.js` exists
- [ ] `backend/routes/auth.routes.js` exists
- [ ] `backend/middleware/auth.middleware.js` exists
- [ ] `backend/middleware/validation.middleware.js` exists
- [ ] `backend/middleware/rateLimiter.middleware.js` exists
- [ ] `backend/middleware/error.middleware.js` exists
- [ ] `backend/utils/jwt.util.js` exists
- [ ] `backend/.env` exists
- [ ] `backend/.gitignore` exists
- [ ] `backend/package.json` exists
- [ ] `backend/README.md` exists

### Frontend Files
- [ ] `frontend/src/pages/Login.jsx` exists
- [ ] `frontend/src/pages/Signup.jsx` exists
- [ ] `frontend/src/contexts/AuthContext.jsx` exists
- [ ] `frontend/src/components/ProtectedRoute.jsx` exists
- [ ] `frontend/src/lib/api.js` exists
- [ ] `frontend/src/App.jsx` updated with auth routes
- [ ] `frontend/src/main.jsx` updated with AuthProvider
- [ ] `frontend/src/components/Header.jsx` updated with auth buttons
- [ ] `frontend/.env` exists

### Documentation Files
- [ ] `README.md` exists (root)
- [ ] `SETUP_GUIDE.md` exists
- [ ] `QUICK_REFERENCE.md` exists
- [ ] `AUTH_IMPLEMENTATION.md` exists
- [ ] `ARCHITECTURE.md` exists
- [ ] `CHECKLIST.md` exists (this file)
- [ ] `backend/README.md` exists

## 🔒 Security Verification

- [ ] Passwords are hashed (check database - should see bcrypt hash)
- [ ] JWT tokens expire after 7 days
- [ ] Rate limiting is active (test by making 6+ login attempts)
- [ ] CORS is configured (frontend can access backend)
- [ ] Input validation works (test with invalid data)
- [ ] Protected routes require authentication
- [ ] Invalid tokens cause auto-logout

## 📊 Final Checks

### Database
- [ ] Connect to MongoDB Atlas dashboard
- [ ] Check "wapio" database exists
- [ ] Check "users" collection exists
- [ ] Check test user exists in collection
- [ ] Verify password is hashed (starts with $2a$ or $2b$)

### Code Quality
- [ ] No console errors in browser
- [ ] No errors in backend terminal
- [ ] No warnings (except MongoDB driver deprecation - safe to ignore)
- [ ] Code is well-formatted
- [ ] All imports resolve

### Documentation
- [ ] All documentation files are readable
- [ ] Setup instructions are clear
- [ ] API endpoints are documented
- [ ] Architecture is explained

## 🎉 Success Criteria

### ✅ System is Ready When:
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] MongoDB connection succeeds
- [ ] Can signup new user
- [ ] Can login with user
- [ ] Can access protected routes when logged in
- [ ] Cannot access protected routes when logged out
- [ ] Token persists across browser refresh
- [ ] All toast notifications work
- [ ] Mobile responsive

## 🚨 Common Issues Checklist

If something doesn't work, check:

- [ ] MongoDB IP whitelist configured (most common issue!)
- [ ] Backend .env file has correct values
- [ ] Frontend .env file has correct API URL
- [ ] Both servers are running
- [ ] Ports 5001 and 5173 are not in use by other apps
- [ ] Node modules are installed (both frontend and backend)
- [ ] Browser cache is cleared
- [ ] No firewall blocking connections

## 📞 Need Help?

If you've checked everything and still have issues:

1. Check MongoDB Atlas connection:
   - Network Access tab
   - IP whitelist (0.0.0.0/0)
   - Database user credentials

2. Check backend logs:
   - Look for error messages
   - Verify MongoDB connection message

3. Check frontend console:
   - Look for network errors
   - Verify API calls are made to correct URL

4. Review documentation:
   - SETUP_GUIDE.md
   - QUICK_REFERENCE.md
   - Backend README.md

## ✅ Completion

- [ ] **All items checked above**
- [ ] **System fully functional**
- [ ] **Ready to develop features**

---

**Congratulations! Your authentication system is fully set up and tested! 🎉**

Date Completed: _______________
Completed By: _______________
