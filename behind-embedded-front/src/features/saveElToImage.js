import * as fs from 'node:fs'
import * as htmlToImage from 'html-to-image'

const saveComponentImage = async (id, path) => {
  const node = document.getElementById(id)
  const imageDataURL = await htmlToImage.toJpeg(node, { quality: 0.95 })

  const imageBase64 = imageDataURL.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(imageBase64, 'base64')
  fs.writeFileSync(path, buf)
}

export default saveComponentImage
