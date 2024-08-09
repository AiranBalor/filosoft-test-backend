import { PDFDocument, rgb } from 'pdf-lib'

export async function generatePDF(words: string[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])
    const { height } = page.getSize()
    const fontSize = 30
    let y = height - fontSize * 2
  
    page.drawText('Top 10 Longest Words:', {
      x: 50,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
    })
  
    y -= fontSize * 2
  
    words.forEach(word => {
      page.drawText(word, {
        x: 50,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
      })
      y -= fontSize * 1.5
    })
  
    return await pdfDoc.save()
  }