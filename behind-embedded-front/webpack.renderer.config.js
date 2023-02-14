const rules = require('./webpack.rules')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
})
rules.push({
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
})
rules.push({
  test: /\.json$/,
  loader: 'json-loader'
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  }
}
