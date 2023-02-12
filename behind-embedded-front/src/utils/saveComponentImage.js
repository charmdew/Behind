import * as fs from 'node:fs'
import html2canvas from 'html2canvas'

const saveComponentImage = async (ref, path) => {
  const element = ref.current
  const canvas = await html2canvas(element)

  const dataURL = canvas.toDataURL('image/jpg')
  const imageBase64 = dataURL.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(imageBase64, 'base64')
  fs.writeFileSync(path, buf)
}

export default saveComponentImage
