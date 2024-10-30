const express = require('express');
const scrapeData = require('./scraper');
const sendEmail = require('./emailService');

const app = express();
const PORT = 3000;

app.get('/scrap-and-send', async (req, res) => {
  const url = 'https://books.toscrape.com'; // URL do site a ser scrapeado

  try {
    const books = await scrapeData(url);

    if (!books) {
      return res.status(500).send('Não foi possível capturar os dados.');
    }

    // Formata os dados para o e-mail
    const subject = `Scrap de Livros`;
    const text = books.map(book => `Título: ${book.title}\nPreço: ${book.price}`).join('\n\n');

    await sendEmail(subject, text);
    res.status(200).send('Scraping e e-mail enviados com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro ao realizar o processo.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
