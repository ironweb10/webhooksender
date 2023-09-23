const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // You can use any port you prefer

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle a POST request to the /send-message endpoint
app.post('/send-message', (req, res) => {
  // Get the user input from the request body
  const { webhookUrl, message } = req.body;

  // Check if webhookUrl and message are provided
  if (!webhookUrl || !message) {
    return res.status(400).json({ error: 'Missing webhookUrl or message' });
  }

  // Configure your webhook data
  const webhookData = {
    content: message,
  };

  // Send the webhook using Axios
  axios
    .post(webhookUrl, webhookData)
    .then((response) => {
      console.log('Webhook sent successfully:', response.data);
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error('Error sending webhook:', error.message);
      res.status(500).json({ error: 'Failed to send webhook' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});