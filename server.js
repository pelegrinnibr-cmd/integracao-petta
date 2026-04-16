const express = require('express');

const app = express();
app.use(express.json());

/**
 * ROTA TESTE (abre no navegador)
 */
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

/**
 * CRIAR PAGAMENTO (TESTE)
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
        payment_method: 'pix',
        customer: {
          name: 'Teste',
          email: 'teste@email.com',
          document: '12345678900'
        }
      })
    });

    const data = await response.json();

    console.log(data);
    res.json(data);

  } catch (error) {
    console.log(error);
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
 * SERVIDOR (IMPORTANTE PRO RENDER)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});