const webpack = require("webpack");

// Reading configuration
// When we want deploy to 'prod', this configuration passed as parameter thru command line
const clientConfig = require("./webpack.client.config");

module.exports = function setupDevServer(app) {
  // This code run when 'required' from server.js file 
  // during initialization in (!prod) mode
  console.log('--> setting up DevServer')

  clientConfig.entry.app = [
    "webpack-hot-middleware/client",
    clientConfig.entry.app
  ];
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
  // This is building the app. In 'prod' this is done explicitly thru command line
  const clientCompiler = webpack(clientConfig);
  app.use (
    require("webpack-dev-middleware")(clientCompiler, {
      stats:{
        colors: true
      }
    })
  );
  app.use(require("webpack-hot-middleware")(clientCompiler));
};
