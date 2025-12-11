# 🚀 Wapio - WhatsApp Bulk Messaging Platform

Complete authentication system with Express.js backend and React frontend.

## 📦 What's Been Set Up

### Backend (`/backend`)
- ✅ Express.js server with security middleware
- ✅ MongoDB integration with Mongoose
- ✅ JWT-based authentication system
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware
- ✅ Input validation and sanitization
- ✅ Rate limiting for security
- ✅ Error handling
- ✅ CORS configuration

### Frontend (`/frontend`)
- ✅ Login page with beautiful UI
- ✅ Signup page with form validation
- ✅ AuthContext for global auth state
- ✅ Protected routes (Dashboard, Templates, Send Message)
- ✅ API utility for backend communication
- ✅ Toast notifications for user feedback

## 🎯 Quick Start

### 1. Setup MongoDB Atlas (IMPORTANT!)

Your MongoDB connection is failing because your IP address needs to be whitelisted in MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster → Network Access
3. Click "Add IP Address"
4. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
5. Or add your specific IP address

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

The server will run on http://localhost:5001

### 3. Start Frontend Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173

## 📝 How to Test

### Using the UI

1. **Go to the frontend**: http://localhost:5173
2. **Click "Get Started"** or navigate to `/signup`
3. **Create an account** with:
   - Name: Your Name
   - Email: test@example.com
   - Password: Test123456 (must have uppercase, lowercase, and number)
   - Phone: Optional
   - Company: Optional
4. **You'll be automatically logged in** and redirected to the dashboard
5. **Try logging out** and logging back in at `/login`

### API Testing with cURL

```bash
# 1. Register a new user
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123456"
  }'

# 2. Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'

# 3. Get user profile (replace YOUR_TOKEN with the token from login)
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔐 Features Implemented

### Backend Features
- **User Registration**: `/api/auth/signup`
- **User Login**: `/api/auth/login`
- **Get Profile**: `/api/auth/me` (Protected)
- **Update Profile**: `/api/auth/profile` (Protected)
- **Change Password**: `/api/auth/change-password` (Protected)
- **Logout**: `/api/auth/logout` (Protected)

### Frontend Features
- **Login Page**: `/login` - Beautiful login form with validation
- **Signup Page**: `/signup` - Multi-step registration form
- **Protected Routes**: Dashboard, Templates, and Send Message require authentication
- **Auto-redirect**: Unauthenticated users are redirected to login
- **Token Management**: Automatic token storage and refresh
- **User Context**: Global auth state management

## 📂 Project Structure

```
wapio/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js       # Auth logic
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── error.middleware.js      # Error handling
│   │   ├── rateLimiter.middleware.js # Rate limiting
│   │   └── validation.middleware.js  # Input validation
│   ├── models/
│   │   └── User.model.js            # User schema
│   ├── routes/
│   │   └── auth.routes.js           # Auth routes
│   ├── utils/
│   │   └── jwt.util.js              # JWT helpers
│   ├── .env                         # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                    # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # Updated with Login/Signup buttons
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Global auth state
│   │   ├── lib/
│   │   │   ├── api.js               # API utilities
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── SendMessage.jsx
│   │   │   └── Templates.jsx
│   │   ├── App.jsx                  # Updated with auth routes
│   │   └── main.jsx                 # Auth provider wrapper
│   ├── .env                         # Frontend config
│   └── package.json
```

## 🔒 Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Password validation (min 6 chars, uppercase, lowercase, number)
   - Never returned in responses

2. **JWT Security**
   - 7-day token expiration
   - Secure token verification
   - Auto-logout on invalid tokens

3. **Rate Limiting**
   - Login: 5 attempts per 15 minutes
   - General API: 100 requests per 15 minutes

4. **Input Validation**
   - Email format validation
   - Required field validation
   - Data sanitization (NoSQL injection prevention)

5. **Security Headers**
   - Helmet.js for HTTP security
   - CORS protection
   - MongoDB sanitization

## 🎨 UI/UX Features

- ✨ Beautiful gradient backgrounds
- 🎯 Clean, modern design matching your theme
- 📱 Fully responsive (mobile & desktop)
- 🔒 Password visibility toggle
- ✅ Real-time validation feedback
- 🎉 Toast notifications for actions
- ⚡ Loading states during API calls
- 🎨 Green theme color (#10B981)

## 🐛 Troubleshooting

### MongoDB Connection Issues
**Error**: "Could not connect to any servers in your MongoDB Atlas cluster"

**Solution**: 
1. Go to MongoDB Atlas → Network Access
2. Add IP address 0.0.0.0/0 (for development)
3. Wait 2-3 minutes for changes to propagate

### Port Already in Use
**Error**: "EADDRINUSE: address already in use"

**Solution**: 
- Backend uses port 5001
- Frontend uses port 5173
- Kill any processes using these ports or update `.env` files

### CORS Errors
**Solution**: Backend `.env` should have:
```env
FRONTEND_URL=http://localhost:5173
```

## 🚀 Next Steps

Now that authentication is set up, you can:

1. **Add more protected routes** for WhatsApp features
2. **Create campaign management** endpoints
3. **Add file upload** for contact lists
4. **Implement template management**
5. **Add analytics dashboard**
6. **Set up WhatsApp Business API** integration

## 📞 Environment Variables

### Backend (`.env`)
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

## 📖 API Documentation

Full API documentation is available in `backend/README.md`

## 🎉 You're All Set!

Your authentication system is fully functional with:
- ✅ Secure backend API
- ✅ Beautiful login/signup pages
- ✅ Protected routes
- ✅ Token management
- ✅ Error handling
- ✅ Best practices implemented

Happy coding! 🚀
