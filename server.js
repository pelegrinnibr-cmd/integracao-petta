const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/criar-pagamento', async (req, res) => {
  const dados = req.body;

  const response = await fetch('https://api.petta.me/payments', {
    method: 'POST',
    headers: {
  'Authorization': 'Bearer sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d',
  'Content-Type': 'application/json'
}
    body: JSON.stringify({
      amount: dados.valor,
      customer: {
        name: dados.nome,
        document: dados.cpf
      }
    })
  });

  const result = await response.json();

  res.json(result);
});

app.post('/webhook', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});