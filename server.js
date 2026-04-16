const express = require('express');
const fetch = require('node-fetch'); // <- IMPORTANTE

const app = express();
app.use(express.json());

// ROTA TESTE
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// CRIAR PIX NA PETTA
app.post('/criar-pagamento', async (req, res) => {
  try {
    const response = await fetch('https://api.petta.me/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'SUA_API_KEY_AQUI' // troca depois
      },
      body: JSON.stringify({
        amount: 500,
        method: "PIX",
        metadata: {
          sellerExternalRef: "teste123"
        },
        customer: {
          name: "Teste",
          email: "teste@email.com",
          phone: "11999999999",
          documentType: "CPF",
          document: "12345678900"
        },
        items: [
          {
            title: "Pagamento teste",
            amount: 500,
            quantity: 1,
            tangible: false,
            externalRef: "item_1"
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data);

    return res.json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

// WEBHOOK
app.post('/webhook', (req, res) => {
  console.log('WEBHOOK RECEBIDO:', req.body);
  res.sendStatus(200);
});

// PORT (RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});