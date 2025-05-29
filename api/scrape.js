import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  const PUBMED_URL =
    'https://pubmed.ncbi.nlm.nih.gov/?term=Beug+S%5BAuthor%5D&sort=pubdate&size=100'
  try {
    const { data } = await axios.get(PUBMED_URL)
    const $ = cheerio.load(data)
    const results = []

    $('article.full-docsum').each((i, el) => {
      const title = $(el).find('a.docsum-title').text().trim()
      const authors = $(el).find('.full-authors').text().trim()
      const journal = $(el).find('.docsum-journal-citation.full-journal-citation').text().trim()
      const relativeUrl = $(el).find('a.docsum-title').attr('href')
      const url = `https://pubmed.ncbi.nlm.nih.gov${relativeUrl}`

      const dateMatch = journal.match(/(\d{4}) (\w{3,}) ?(\d{0,2})?/)
      let date = new Date(0)

      if (dateMatch) {
        const [_, year, monthStr, dayStr] = dateMatch
        const months = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        }
        const month = months[monthStr.slice(0, 3)]
        const day = parseInt(dayStr) || 1
        date = new Date(parseInt(year), month, day)
      }
      results.push({ title, authors, journal, url, date })
    })
    results.sort((a, b) => b.date - a.date)

    res.json(results)
  } catch (error) {
    console.error('Error scraping PubMed:', error)
    res.status(500).json({ error: 'Failed to scrape data' })
  }
}
