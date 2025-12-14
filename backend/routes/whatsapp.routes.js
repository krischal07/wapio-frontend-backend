import express from 'express';
import {
  verifyWebhook,
  handleWebhook,
  sendMessage
} from '../controllers/whatsapp.controller.js';

const router = express.Router();

/**
 * WhatsApp Webhook Routes
 */

// GET /api/whatsapp/webhook - Verify webhook
router.get('/verify-webhook', verifyWebhook);

// POST /api/whatsapp/webhook - Handle incoming webhook events
router.post('/webhook', handleWebhook);

// POST /api/whatsapp/send - Send a message
router.post('/send', sendMessage);

export default router;
