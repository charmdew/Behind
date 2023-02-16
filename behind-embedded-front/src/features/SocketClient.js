const net = require('node:net')

class SocketClient {
  constructor(port, host) {
    this.socket = new net.Socket()
    this.socket.connect(port, host, function () {
      console.log(`Connected. Port:${port}. Host:${host}.`)
    })
  }

  send(data, callback) {
    this.socket.write(data, callback)
  }
}

export default SocketClient
