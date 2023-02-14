const cropImageToFitProfileCard = (imageDataURL, setImageDataURL) => {
  try {
    const img = new Image()
    img.src = imageDataURL
    const canvas = document.createElement('canvas')

    img.onload = function () {
      const imgWidth = img.width
      const imgHeight = img.height
      canvas.width = (imgHeight * 874) / 1080
      canvas.height = imgHeight

      const cnv = canvas.getContext('2d')
      const sx = (imgWidth * 523) / 1920
      const sy = 0
      const sw = (imgWidth * 874) / 1920
      const sh = imgHeight
      const dx = 0
      const dy = 0
      const dw = canvas.width
      const dh = canvas.height
      cnv.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

      setImageDataURL(canvas.toDataURL('image/png').toString())
    }
  } catch (e) {
    console.error(e)
  }
}

export default cropImageToFitProfileCard
