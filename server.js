const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// TESTE
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// YAMPI WEBHOOK
app.post('/yampi/order', async (req, res) => {
  try {
    const order = req.body;

    console.log("🔥 PEDIDO DA YAMPI:", order);

    const response = await fetch('https://api.petta.me/transactions', {
      method: 'POST',
      headers: {
        'x-api-key': 'sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round((order.total || 100) * 100),
        method: "PIX",
        metadata: {
          yampiOrderId: order.id
        },
        customer: {
          name: order.customer?.name || "Cliente",
          email: order.customer?.email || "teste@gmail.com",
          phone: order.customer?.phone || "11999999999",
          documentType: "CPF",
          document: "12345678900"
        },
        items: [
          {
            title: "Pedido Yampi",
            amount: Math.round((order.total || 100) * 100),
            quantity: 1,
            tangible: false
          }
        ]
      })
    });

    const pix = await response.json();

    console.log("💰 PIX GERADO:", pix);

    res.status(200).send({
      success: true,
      pix: pix?.data?.pix?.qrcodeUrl
    });

  } catch (error) {
    console.log("❌ ERRO:", error);
    res.status(500).send("erro");
  }
});

// WEBHOOK PETTA
app.post('/webhook', (req, res) => {
  console.log('🔥 PETTA WEBHOOK:', req.body);
  res.sendStatus(200);
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});