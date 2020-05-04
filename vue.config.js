const path = require('path');

// eslint-disable-next-line no-unused-vars
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('animation.gsap', path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'));
  }
  // module: {
  //   rules: [

  //     {
  //       test: /\.js$/,
  //       loader: "imports-loader?define=>false"
  //     },
  //   ],
  // },
}