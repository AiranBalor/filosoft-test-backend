import axios from 'axios'
import { load } from 'cheerio'

export async function fetchPageText(url: string): Promise<string> {
    try {
      const { data } = await axios.get(url)
      const $ = load(data)
      return $('body').text()
    } catch (error) {
      throw new Error('Error fetching the page')
    }
  }