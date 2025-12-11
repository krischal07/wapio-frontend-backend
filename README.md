# 🚀 Wapio - WhatsApp Bulk Messaging Platform

A modern, secure WhatsApp bulk messaging platform with beautiful UI and robust authentication system.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-blue.svg)
![Database](https://img.shields.io/badge/database-MongoDB-green.svg)

## ✨ Features

### 🔐 Authentication & Security
- ✅ **Secure User Registration** - Email validation, password hashing with bcrypt
- ✅ **JWT Authentication** - Token-based auth with 7-day expiration
- ✅ **Protected Routes** - Dashboard and features require authentication
- ✅ **Rate Limiting** - Prevent brute force attacks (5 login attempts per 15 min)
- ✅ **Input Validation** - Server-side validation with express-validator
- ✅ **Security Headers** - Helmet.js for HTTP security
- ✅ **CORS Protection** - Configured for frontend-backend communication
- ✅ **NoSQL Injection Prevention** - Sanitized database queries

### 🎨 User Interface
- ✅ **Beautiful Login Page** - Modern design with green theme
- ✅ **Comprehensive Signup Form** - Name, email, phone, company fields
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Toast Notifications** - User-friendly feedback for all actions
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Password Visibility Toggle** - Better UX for password fields
- ✅ **Form Validation** - Real-time validation with helpful messages

### 🛠️ Technical Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Rate limiting & security middleware

**Frontend:**
- React with Vite
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Lucide React for icons
- Sonner for notifications

## 📋 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### 1. Clone & Install

```bash
# Navigate to project
cd wapio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (if needed)
cd ../frontend
npm install
```

### 2. Configure MongoDB Atlas

**IMPORTANT:** Your backend won't work until you do this!

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster → **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0) for development
5. Click **"Confirm"**
6. **Wait 2-3 minutes** for changes to propagate

### 3. Start the Application

**Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on: http://localhost:5001

**Frontend (new terminal):**
```bash
cd frontend
npm run dev
```
✅ Frontend runs on: http://localhost:5173

### 4. Create Your First Account

1. Open http://localhost:5173
2. Click **"Get Started"** button
3. Fill in the signup form:
   - **Name:** Your Name
   - **Email:** your@email.com
   - **Password:** Must have uppercase, lowercase, and number (min 6 chars)
   - Example: `Welcome123`
4. Click **"Create Account"**
5. You'll be automatically logged in!

## 📁 Project Structure

```
wapio/
├── backend/                    # Node.js + Express API
│   ├── config/                 # Configuration files
│   │   └── db.js              # MongoDB connection
│   ├── controllers/           # Business logic
│   │   └── auth.controller.js # Authentication logic
│   ├── middleware/            # Express middleware
│   │   ├── auth.middleware.js # JWT verification
│   │   ├── validation.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   └── error.middleware.js
│   ├── models/                # Mongoose models
│   │   └── User.model.js     # User schema
│   ├── routes/                # API routes
│   │   └── auth.routes.js    # Auth endpoints
│   ├── utils/                 # Utility functions
│   │   └── jwt.util.js       # JWT helpers
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── README.md             # Backend documentation
│   └── server.js             # Entry point
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx   # Navigation header
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   └── dashboard/   # Dashboard components
│   │   ├── contexts/        # React contexts
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── lib/            # Utilities
│   │   │   ├── api.js      # API integration
│   │   │   └── utils.js    # Helper functions
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx    # Landing page
│   │   │   ├── Login.jsx   # Login page ✨
│   │   │   ├── Signup.jsx  # Signup page ✨
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Templates.jsx
│   │   │   └── SendMessage.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Frontend config
│   └── package.json
│
├── SETUP_GUIDE.md          # Detailed setup instructions
├── QUICK_REFERENCE.md      # Quick reference guide
├── AUTH_IMPLEMENTATION.md  # Implementation details
└── README.md              # This file
```

## 🔑 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/health` | Health check |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/profile` | Update user profile |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/logout` | Logout user |

## 🔐 Authentication Flow

```
Registration:
User fills form → Frontend validates → API call → 
Backend validates → Hash password → Save to DB → 
Generate JWT → Return token + user → Save to localStorage → 
Update AuthContext → Redirect to Dashboard

Login:
User enters credentials → API call (rate limited) → 
Backend verifies → Generate JWT → Return token + user → 
Save to localStorage → Update AuthContext → Redirect to Dashboard

Protected Route Access:
Route accessed → Check token → 
Valid? → Allow access → Invalid? → Redirect to Login
```

## 🎨 UI Pages

### Landing Page (`/`)
- Header with Login/Get Started buttons
- Hero section
- Features showcase
- Pricing
- FAQ
- Footer

### Login Page (`/login`)
- Email and password fields
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Link to signup

### Signup Page (`/signup`)
- Name, email, phone, company fields
- Password with strength validation
- Confirm password
- Terms acceptance
- Link to login

### Dashboard (`/dashboard`) - Protected
- KPI cards
- Performance charts
- Campaign table
- Requires authentication

## 🛠️ Environment Configuration

### Backend `.env`
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wapio
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5001/api
```

## 🧪 Testing

### Test with UI (Recommended)
1. Open http://localhost:5173
2. Click "Get Started"
3. Register with test credentials
4. Verify auto-login and redirect
5. Try accessing protected routes
6. Logout and login again

### Test with cURL
```bash
# Register
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@wapio.com","password":"Test123456"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@wapio.com","password":"Test123456"}'

# Get Profile (replace TOKEN)
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
**Error:** "Could not connect to any servers"

**Solution:** 
1. Go to MongoDB Atlas → Network Access
2. Add IP address 0.0.0.0/0
3. Wait 2-3 minutes

### Port Already in Use
**Error:** "EADDRINUSE: address already in use"

**Solution:**
```bash
# Kill backend (port 5001)
lsof -ti:5001 | xargs kill -9

# Kill frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

### CORS Errors
**Solution:** Check backend .env has correct `FRONTEND_URL`

### Token Invalid
**Solution:** User will be auto-logged out and redirected to login

## 📚 Documentation

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[AUTH_IMPLEMENTATION.md](./AUTH_IMPLEMENTATION.md)** - Implementation details
- **[backend/README.md](./backend/README.md)** - Backend API documentation

## 🚀 What's Next?

Now that authentication is complete, you can add:

1. **Campaign Management**
   - Create/edit campaigns
   - Schedule messages
   - Track delivery status

2. **Contact Management**
   - Import contacts (CSV/Excel)
   - Create contact groups
   - Contact list management

3. **Template System**
   - WhatsApp Business API templates
   - Variable substitution
   - Template approval workflow

4. **Analytics Dashboard**
   - Campaign analytics
   - Delivery reports
   - User statistics
   - Export reports

5. **WhatsApp Integration**
   - Connect WhatsApp Business API
   - Send messages
   - Handle webhooks
   - Message status updates

6. **Advanced Features**
   - Email verification
   - Password reset
   - Two-factor authentication
   - User roles & permissions
   - Admin panel

## 🔒 Security Features

✅ Password hashing with bcrypt (10 rounds)
✅ JWT tokens with expiration
✅ Rate limiting on sensitive endpoints
✅ Input validation and sanitization
✅ NoSQL injection prevention
✅ XSS protection
✅ Security headers (Helmet.js)
✅ CORS configuration
✅ Protected routes
✅ Error message sanitization

## 📝 Scripts

### Backend
```bash
npm start      # Production mode
npm run dev    # Development mode with nodemon
```

### Frontend
```bash
npm run dev    # Development mode
npm run build  # Production build
npm run preview # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Express.js community
- React team
- MongoDB team
- All open-source contributors

## 📞 Support

For issues or questions:
- Check documentation files
- Review error messages
- Check MongoDB Atlas connection
- Verify environment variables

---

**Built with ❤️ for efficient WhatsApp bulk messaging**

🌟 Star this repo if you find it helpful!

**Status:** ✅ Authentication Complete | 🚀 Ready for Development
