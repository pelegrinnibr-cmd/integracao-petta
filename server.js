const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

/**
 * ROTA PARA CRIAR PAGAMENTO (TESTE DIRETO NO NAVEGADOR)
 */
app.get('/criar-pagamento', async (req, res) => {
  try {
    const response = await fetch('https://api.petta.me/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 100, // R$1,00 (em centavos)
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
 * WEBHOOK (RECEBE CONFIRMAÇÃO DE PAGAMENTO)
 */
app.post('/webhook', (req, res) => {
  console.log('Webhook recebido:', req.body);
  res.sendStatus(200);
});

/**
 * SERVIDOR
 */
app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});