const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

/**
 * ROTA RAIZ (TESTE)
 */
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

/**
 * TESTE DA API PETTA (IMPORTANTE)
 */
app.get('/teste-petta', async (req, res) => {
  try {
    const response = await fetch('https://api.petta.me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d'
      }
    });

    const text = await response.text();

    console.log('RESPOSTA PETTA:', text);

    res.send(text);

  } catch (error) {
    console.log('ERRO:', error);
    res.status(500).send(error.toString());
  }
});

/**
 * SERVIDOR (RENDER)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Rodando na porta', PORT);
});