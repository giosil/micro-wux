const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const packageJson = require("./package.json");

const isAnyOf = (value, list) => list.includes(value);

module.exports = (env, argv) => {
  let prodMode = argv?.p || argv?.mode === "production";
  
  return {
    mode: prodMode ? "production" : "development",
    output: {
//    filename: `${package.name.split('/')[1] || package.name}-${package.version}.js`,
      filename: `index.js`,
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: packageJson.name,
      publicPath: path.resolve(process.cwd(), "public"),
    },
    plugins: [
      // These plugins enable standalone mode for local development
      !prodMode && new HtmlWebpackPlugin(),
      new StandaloneSingleSpaPlugin({
        appOrParcelName: packageJson.name,
        disabled: prodMode,
      })
    ].filter(Boolean),
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      onListening: function ({
        server /* https://nodejs.org/api/net.html#class-netserver */,
        compiler,
      }) {
        if (!server)
          throw new Error("webpack-dev-server is missing a server instance");

        // config values
        const { port: serverPort, address } = server.address();
        const { publicPath, filename } = compiler.options.output;

        // derived values
        const protocol = compiler.options.devServer.https
          ? "https://"
          : "http://";
        const host = address === "::" ? "localhost" : address;
        const port = Boolean(serverPort) ? `:${serverPort}` : "";
        const path = isAnyOf(publicPath, ["", "auto"]) ? "/" : publicPath;

        console.log(
          `\n  ⚡️ single-spa application entry: ${protocol}${host}${port}${path}${filename}\n`
        );
      },
    },
    externals: ["single-spa"],
  };
};
