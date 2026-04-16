const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// TESTE
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// CRIAR PAGAMENTO NA PETTA
app.get('/criar-pagamento', async (req, res) => {
  try {
    const response = await fetch('https://api.petta.me/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d'
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

    console.log('RESPOSTA PETTA:', data);

    return res.json(data);

  } catch (error) {
    console.log('ERRO:', error);
    return res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

// WEBHOOK (Petta vai chamar isso depois)
app.post('/webhook', (req, res) => {
  console.log('WEBHOOK RECEBIDO:', req.body);
  res.sendStatus(200);
});

// PORTA DO RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});