import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.get('/', (req, res) => {
  console.log('query params: ' + JSON.stringify(req.query));
  res.json({ queryParams: req.query });
});

app.post('/reportUsage', async (req, res) => {
  console.log('received /reportUsage: ' + JSON.stringify(req.body));

  const usageCount = req.body.usageCount;
  const meterEvent = await stripe.billing.meterEvents.create({
    event_name: 'emoji_count',
    payload: {
      stripe_customer_id: 'cus_R2sq1hEyZIH1k4',
      value: usageCount,
    },
  });

  res.send({ success: true, meterEvent });
});

app.post(
  '/webhook',
  express.json({ type: 'application/json' }),
  (request, response) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case 'billing.alert.triggered':
        console.log('billing alert received');
        console.log({ event });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
