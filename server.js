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

    const text = await response.text(); // IMPORTANTE
    console.log(text);

    res.send(text);

  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao criar pagamento');
  }
});