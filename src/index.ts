import express from 'express'
const cors = require('cors');
import { fetchPageText } from './utils/fetchPageText'
import { getLongestWords } from './utils/getLongestWords'
import { generatePDF } from './utils/generatePDF'

const app = express()
const PORT = 8080

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json())

app.post('/generate-pdf', async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).send('URL is required')
  }

  try {
    const text = await fetchPageText(url)
    const longestWords = getLongestWords(text)
    const pdfBytes = await generatePDF(longestWords)

    res.setHeader('Content-Type', 'application/pdf')
    res.send(Buffer.from(pdfBytes))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).send(errorMessage)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Обработка исключений: Текущая реализация не обрабатывает все возможные исключения при парсинге HTML и генерации PDF. Для улучшения можно добавить более детализированную обработку ошибок.
// Поддержка разных языков: Алгоритм поиска самых длинных слов может быть улучшен для поддержки разных языков и кодировок.
// Тестирование: Добавить юнит-тесты для основных функций сервиса.
// Безопасность: Проверка URL на безопасность и допустимость перед отправкой запроса.