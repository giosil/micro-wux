const path = require("path");

module.exports = (env, argv) => {
  let prodMode = argv?.p || argv?.mode === "production";
  return {
    mode: prodMode ? "production" : "development",
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      static: {
        directory: path.join(__dirname, 'public'),
        serveIndex: false,
      },
      port: 8080
    }
  };
};
