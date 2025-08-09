const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const token = process.env.TOKEN;

app.get('/webhooks', (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/webhooks', (req, res) => {
  const body = req.body;

  if (body.field !== 'messages') {
    // No es un mensaje válido, no procesar
    return res.sendStatus(400);
  }

  console.log('Mensaje recibido:', JSON.stringify(body, null, 2));
  // Aquí podés agregar lógica para procesar y responder mensajes

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
