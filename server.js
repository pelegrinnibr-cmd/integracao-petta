const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

/**
 * ROTA RAIZ
 */
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

/**
 * CRIAR PAGAMENTO
 */
app.get('/criar-pagamento', async (req, res) => {
  try {
    const response = await fetch('https://api.petta.me/payments', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 100,
        method: 'pix',
        customer: {
          name: 'Teste',
          document: '12345678900'
        }
      })
    });

    const text = await response.text();
    console.log('RESPOSTA PETTA:', text);

    res.send(text);

  } catch (error) {
    console.log('ERRO:', error);
    res.status(500).send('Erro ao criar pagamento');
  }
});

/**
 * WEBHOOK
 */
app.post('/webhook', (req, res) => {
  console.log('Webhook:', req.body);
  res.sendStatus(200);
});

/**
 * SERVIDOR
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});