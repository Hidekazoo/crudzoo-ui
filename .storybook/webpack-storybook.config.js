const path = require("path");
const md5 = require("md5");
const fs = require("fs");

const fileHashMemo = {};

const getFileHash = (filepath) => {
  if (fileHashMemo[filepath]) {
    return fileHashMemo[filepath];
  }
  let contentHash = md5(fs.readFileSync(filepath, "utf8"));
  fileHashMemo[filepath] = contentHash.substr(contentHash.length - 5);
  return fileHashMemo[filepath];
};

const generateScopedName = (localName, resourcePath) => {
  let componentName = resourcePath.split("/").slice(-2, -1);
  let contentHash = getFileHash(resourcePath);

  //let hash = md5(resourcePath);
  return `${componentName}_${localName}_${contentHash}`;
};

module.exports = () => {
  return {
    // parallelism: 1,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [{ loader: require.resolve("babel-loader") }],
        },
        {
          test: /components[\\/].*\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: (context, localIdentName, localName) => {
                    return generateScopedName(localName, context.resourcePath);
                  },
                },
                importLoaders: 1,
              },
            },
          ],
          include: path.resolve(__dirname, "../"),
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
          include: path.resolve(__dirname, "../"),
          exclude: /components[\\/].*\.css$/,
        },
        {
          test: /\.(ttf|woff|woff2|svg|gif|cur|eot|png|jpg)(\?[a-f0-9]{32})?$/,
          loader: "url-loader?limit=8192",
        },
      ],
    },
  };
};
