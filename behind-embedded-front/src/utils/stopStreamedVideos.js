const stopStreamedVideos = () => {
  const videoElems = document.getElementsByTagName('video')
  for (let elem of videoElems) {
    const stream = elem.srcObject
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
      elem.srcObject = null
    }
  }
}

export default stopStreamedVideos
