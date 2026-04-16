app.post('/yampi/order', async (req, res) => {
  try {
    const order = req.body;

    console.log("🔥 PEDIDO RECEBIDO DA YAMPI:");
    console.log(JSON.stringify(order, null, 2));

    // aqui você vai criar o PIX na Petta
    const response = await fetch('https://api.petta.me/transactions', {
      method: 'POST',
      headers: {
        'x-api-key': 'sk_16fff82e3735bb91b2425c88ec703d549d362267bf61937d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round((order.total || order.amount) * 100),
        method: "PIX",
        metadata: {
          yampiOrderId: order.id
        },
        customer: {
          name: order.customer?.name || "Cliente",
          email: order.customer?.email || "teste@gmail.com",
          phone: order.customer?.phone || "11999999999",
          documentType: "CPF",
          document: order.customer?.document || "12345678900"
        },
        items: [
          {
            title: "Pedido Yampi",
            amount: Math.round((order.total || order.amount) * 100),
            quantity: 1,
            tangible: false
          }
        ]
      })
    });

    const pix = await response.json();

    console.log("💰 PIX GERADO:");
    console.log(pix);

    res.status(200).send({
      success: true,
      pix: pix?.data?.pix?.qrcodeUrl
    });

  } catch (error) {
    console.log("❌ ERRO:", error);
    res.status(500).send("erro webhook");
  }
});