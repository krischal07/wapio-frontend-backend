import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent NoSQL injection

// CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler Middleware (must be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║                                      ║
  ║   🚀 Wapio Backend Server Running    ║
  ║                                      ║
  ║   Environment: ${process.env.NODE_ENV?.padEnd(22) || 'development'.padEnd(22)}║
  ║   Port: ${PORT.toString().padEnd(28)}║
  ║   URL: http://localhost:${PORT.toString().padEnd(16)}║
  ║                                      ║
  ╚══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
