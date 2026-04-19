git config --global user.name "Guilherme"
git config --global user.email "pelegrinnibr@gmail.com"


Conta dolar - bottega
Conta dolar - Guilherme Azevedo
Conta dolar - João Souza - 12$


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d";

// rota teste
app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

// rota checkout
app.post('/checkout', async (req, res) => {
  try {
    const { amount, method, customer } = req.body;

    const response = await fetch('https://api.petta.com/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        amount: amount,
        method: method,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: "11999999999",
          documentType: "CPF",
          document: "12345678900"
        },
        items: [
          {
            title: "Produto Teste",
            amount: amount,
            quantity: 1,
            tangible: false
          }
        ]
      })
    });

    const data = await response.json();

    if (method === "PIX") {
      return res.json({
        success: true,
        pix: data?.data?.pix?.copyPaste || null
      });
    }

    res.json({ success: false });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno" });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});