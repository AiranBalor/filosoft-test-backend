export function getLongestWords(text: string): string[] {
    const words = text.match(/\w+/g) || []
    const uniqueWords = Array.from(new Set(words))
    uniqueWords.sort((a, b) => b.length - a.length)
    return uniqueWords.slice(0, 10)
  }