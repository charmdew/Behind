const net = require('node:net')

class SocketClient {
  constructor(port, host) {
    this.socket = new net.Socket()
    this.socket.connect(port, host, function () {
      console.log(`Connected. Port:${port}. Host:${host}.`)
    })
  }

  send(data) {
    this.socket.write(data)
  }
}

export default SocketClient
