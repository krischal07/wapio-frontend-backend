/**
 * WhatsApp Webhook Controller
 * Handles webhook verification and incoming WhatsApp events
 */

/**
 * Verify WhatsApp Webhook
 * GET /api/whatsapp/webhook
 * 
 * Meta sends a GET request to verify your webhook URL when you set it up
 * in the Meta Developer Console.
 */
export const verifyWebhook = (req, res) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if mode and token are correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully');
      return res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed');
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error('❌ Error in webhook verification:', error);
    return res.sendStatus(500);
  }
};

/**
 * Handle Incoming WhatsApp Webhook Events
 * POST /api/whatsapp/webhook
 * 
 * Receives incoming messages, status updates, and other events from WhatsApp
 */
export const handleWebhook = (req, res) => {
  try {
    const body = req.body;

    console.log('📨 Incoming webhook event:', JSON.stringify(body, null, 2));

    // Check if it's a WhatsApp Business API webhook event
    if (body.object !== 'whatsapp_business_account') {
      console.log('⚠️ Not a WhatsApp Business event');
      return res.sendStatus(404);
    }

    // Process each entry in the webhook event
    if (body.entry && body.entry.length > 0) {
      body.entry.forEach(entry => {
        // Get the changes from the entry
        const changes = entry.changes;
        
        if (changes && changes.length > 0) {
          changes.forEach(change => {
            const value = change.value;
            
            // Handle incoming messages
            if (value.messages && value.messages.length > 0) {
              value.messages.forEach(message => {
                handleIncomingMessage(message, value);
              });
            }

            // Handle message status updates (sent, delivered, read, failed)
            if (value.statuses && value.statuses.length > 0) {
              value.statuses.forEach(status => {
                handleMessageStatus(status);
              });
            }
          });
        }
      });
    }

    // Always respond with 200 to acknowledge receipt
    return res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    // Still return 200 to prevent Meta from retrying
    return res.sendStatus(200);
  }
};

/**
 * Process incoming WhatsApp message
 */
const handleIncomingMessage = (message, value) => {
  const phoneNumber = message.from;
  const messageId = message.id;
  const timestamp = message.timestamp;

  console.log('📩 Message received from:', phoneNumber);
  console.log('📝 Message ID:', messageId);

  // Handle different message types
  switch (message.type) {
    case 'text':
      console.log('💬 Text message:', message.text.body);
      // TODO: Process text message
      // - Store in database
      // - Trigger auto-reply
      // - Update contact information
      break;

    case 'image':
      console.log('🖼️ Image message:', message.image);
      // TODO: Process image message
      break;

    case 'video':
      console.log('🎥 Video message:', message.video);
      // TODO: Process video message
      break;

    case 'audio':
      console.log('🎵 Audio message:', message.audio);
      // TODO: Process audio message
      break;

    case 'document':
      console.log('📄 Document message:', message.document);
      // TODO: Process document message
      break;

    case 'location':
      console.log('📍 Location message:', message.location);
      // TODO: Process location message
      break;

    case 'interactive':
      console.log('🔘 Interactive message:', message.interactive);
      // TODO: Process button/list reply
      break;

    default:
      console.log('❓ Unknown message type:', message.type);
  }
};

/**
 * Process message status updates
 */
const handleMessageStatus = (status) => {
  const messageId = status.id;
  const recipientId = status.recipient_id;
  const statusType = status.status;
  const timestamp = status.timestamp;

  console.log(`📊 Message ${messageId} status: ${statusType}`);

  // TODO: Update message status in database
  // - sent: Message sent to WhatsApp servers
  // - delivered: Message delivered to recipient's device
  // - read: Message read by recipient
  // - failed: Message delivery failed
};

/**
 * Send WhatsApp Message
 * POST /api/whatsapp/send
 * 
 * Send a message to a WhatsApp number
 */
export const sendMessage = async (req, res) => {
  try {
    const { to, message, type = 'text' } = req.body;

    // Validate required fields
    if (!to || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and message are required'
      });
    }

    // TODO: Implement WhatsApp message sending using Meta API
    // - Format phone number
    // - Call WhatsApp Business API
    // - Store message in database
    // - Return message ID

    console.log(`📤 Sending message to ${to}: ${message}`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully (not implemented yet)',
      data: {
        to,
        message,
        type
      }
    });
  } catch (error) {
    console.error('❌ Error sending message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};
