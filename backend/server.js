const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // se não tiver instalado, explico depois
const app = express();

const PORT = process.env.PORT || 3000;

// Configura para servir arquivos estáticos (seus HTML, CSS, JS)
app.use(express.static('.')); // Serve arquivos da raiz do projeto

// Para interpretar JSON no corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para validar o reCAPTCHA (POST)
app.post('/verify-captcha', async (req, res) => {
  const secretKey = '6Lf3iJgrAAAAAAO6Dsb1EvtmzP_lt33l666n_bhl'; // substitua pela sua chave secreta do reCAPTCHA
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token do reCAPTCHA não enviado' });
  }

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      res.json({ success: true, message: 'Captcha validado com sucesso!' });
    } else {
      res.json({ success: false, message: 'Falha na validação do captcha.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao verificar captcha.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
