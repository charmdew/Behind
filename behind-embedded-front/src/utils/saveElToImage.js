import * as fs from 'node:fs'
import * as htmlToImage from 'html-to-image'

const saveElToImage = async (id, path, callback) => {
  const node = document.getElementById(id)
  const imageDataURL = await htmlToImage.toPng(node)

  const imageBase64 = imageDataURL.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(imageBase64, 'base64')
  fs.writeFile(path, buf, callback)
}

export default saveElToImage
