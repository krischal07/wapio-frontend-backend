import express from 'express';

const router = express.Router();

/**
 * WhatsApp Webhook Verification Endpoint
 * This endpoint is used by Meta to verify your webhook URL
 * 
 * When you set up a webhook in Meta Developer Console, Meta will send a GET request
 * to verify that you own this endpoint.
 */
router.get("/whatsapp", (req, res) => {
  const VERIFY_TOKEN =
    process.env.WHATSAPP_VERIFY_TOKEN || "samparka_whatsapp_12345";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully");
    return res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook verification failed");
    return res.sendStatus(403);
  }
});

/**
 * WhatsApp Webhook Event Handler
 * This endpoint receives incoming messages, status updates, and other events from WhatsApp
 * 
 * TODO: Implement webhook event handling logic
 */
router.post("/whatsapp", (req, res) => {
  const body = req.body;

  console.log("📨 Incoming webhook event:", JSON.stringify(body, null, 2));

  // Check if it's a WhatsApp webhook event
  if (body.object) {
    if (body.entry && 
        body.entry[0].changes && 
        body.entry[0].changes[0] && 
        body.entry[0].changes[0].value.messages && 
        body.entry[0].changes[0].value.messages[0]) {
      
      const message = body.entry[0].changes[0].value.messages[0];
      
      console.log("📩 Message received from:", message.from);
      console.log("📝 Message content:", message.text?.body || message);

      // TODO: Process the incoming message
      // - Store in database
      // - Send auto-reply
      // - Trigger workflows
      // - Update contact information
    }

    // Always respond with 200 to acknowledge receipt
    return res.sendStatus(200);
  } else {
    // Not a WhatsApp event
    return res.sendStatus(404);
  }
});

export default router;
