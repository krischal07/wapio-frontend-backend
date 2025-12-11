# Wapio Backend API

A secure and scalable backend API for the Wapio WhatsApp Bulk Messaging Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Role-based access control (User/Admin)
  - Protected routes middleware

- **Security**
  - Helmet.js for security headers
  - Rate limiting for API endpoints
  - MongoDB injection prevention
  - CORS configuration
  - Input validation and sanitization

- **User Management**
  - User registration and login
  - Profile management
  - Password change functionality
  - User sessions tracking

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   The `.env` file is already created with your MongoDB connection. Update the following if needed:
   
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

## 🚀 Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "company": "Tech Corp"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User Profile (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+9876543210",
  "company": "New Company"
}
```

#### Change Password (Protected)
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass123"
}
```

#### Logout (Protected)
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Health Check
```http
GET /api/health
```

### Contact Routes

#### Submit Contact Form (Public)
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "message": "I'm interested in your services..."
}
```

#### Get All Contacts (Protected - Admin)
```http
GET /api/contact?status=new&page=1&limit=20&search=john
Authorization: Bearer <token>
```

#### Get Contact Stats (Protected - Admin)
```http
GET /api/contact/stats
Authorization: Bearer <token>
```

#### Get Contact by ID (Protected - Admin)
```http
GET /api/contact/:id
Authorization: Bearer <token>
```

#### Update Contact Status (Protected - Admin)
```http
PUT /api/contact/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "replied"
}
```

#### Delete Contact (Protected - Admin)
```http
DELETE /api/contact/:id
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── auth.controller.js    # Authentication logic
├── middleware/
│   ├── auth.middleware.js    # JWT authentication
│   ├── error.middleware.js   # Error handling
│   ├── rateLimiter.middleware.js # Rate limiting
│   └── validation.middleware.js  # Input validation
├── models/
│   └── User.model.js         # User schema
├── routes/
│   └── auth.routes.js        # Auth routes
├── utils/
│   └── jwt.util.js           # JWT utilities
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── README.md                # Documentation
└── server.js                # Entry point
```

## 🔒 Security Features

1. **Password Security**
   - Passwords are hashed using bcrypt with salt rounds
   - Passwords are never returned in API responses
   - Strong password validation (min 6 chars, uppercase, lowercase, number)

2. **JWT Authentication**
   - Secure token generation and verification
   - Token expiration (7 days by default)
   - Protected routes require valid tokens

3. **Rate Limiting**
   - Login attempts: 5 per 15 minutes per IP
   - General API: 100 requests per 15 minutes per IP

4. **Input Validation**
   - Email format validation
   - Required field validation
   - Data sanitization to prevent NoSQL injection

5. **Security Headers**
   - Helmet.js for setting security headers
   - CORS configuration for frontend communication

## 🧪 Testing the API

You can test the API using:

1. **Postman or Insomnia:**
   - Import the endpoints listed above
   - Set Authorization header: `Bearer <your_token>`

2. **cURL:**
   ```bash
   # Register
   curl -X POST http://localhost:5000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"John","email":"john@test.com","password":"Test123456"}'

   # Login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@test.com","password":"Test123456"}'
   ```

## 🔄 Database Schema

### User Model
```javascript
{
  name: String,          // Required, 2-50 chars
  email: String,         // Required, unique, valid email
  password: String,      // Required, hashed, min 6 chars
  role: String,          // 'user' or 'admin', default: 'user'
  phone: String,         // Optional
  company: String,       // Optional
  isVerified: Boolean,   // Default: false
  avatar: String,        // Optional
  lastLogin: Date,       // Auto-updated on login
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-updated
}
```

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 📝 Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## 🚀 Deployment

For production deployment:

1. Update `NODE_ENV` to `production`
2. Use a strong `JWT_SECRET`
3. Enable HTTPS
4. Configure proper CORS settings
5. Set up MongoDB indexes
6. Enable MongoDB backups
7. Configure logging and monitoring

## 📄 License

ISC

## 👥 Support

For support, email your-email@example.com or create an issue in the repository.

---

Built with ❤️ using Node.js, Express, and MongoDB
