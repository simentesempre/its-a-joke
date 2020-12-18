const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true
      config.optimization.minimizer = [new TerserPlugin({
        parallel: false
      })]
    }

    return config
  }
}