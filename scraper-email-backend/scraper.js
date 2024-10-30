const puppeteer = require('puppeteer');

async function scrapeData(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Acessa a página fornecida
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  try {
    // Captura todos os livros na página
    const books = await page.$$eval('.product_pod', pods => {
      return pods.map(pod => {
        const title = pod.querySelector('h3 a').getAttribute('title');
        const price = pod.querySelector('.price_color').textContent.trim();
        return { title, price };
      });
    });

    await browser.close();

    return books; // Retorna todos os livros capturados
  } catch (error) {
    console.error('Erro ao capturar dados:', error.message);
    await browser.close();
    return null;
  }
}

module.exports = scrapeData;
