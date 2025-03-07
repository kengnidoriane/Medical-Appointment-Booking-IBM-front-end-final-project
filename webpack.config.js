// Importez le module 'path', qui fournit des utilitaires pour travailler avec les chemins de fichiers
const path = require('path');

// Importez le UglifyJsPlugin, qui est utilisé pour minifier le code JavaScript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Importez le MiniCssExtractPlugin, qui est utilisé pour extraire le CSS dans un fichier séparé
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Exportez la configuration Webpack sous forme d'objet
module.exports = {
  // Spécifiez le point d'entrée de l'application, qui est le fichier à partir duquel Webpack commencera à construire
  entry: './src/index.js',

  // Spécifiez la configuration de sortie
  output: {
    // Spécifiez le chemin où le fichier de sortie sera généré
    path: path.resolve(__dirname, 'dist'),
    // Spécifiez le nom du fichier de sortie
    filename: 'bundle.js',
  },

  // Spécifiez la configuration des modules
  module: {
    // Spécifiez un tableau de règles pour le traitement des différents types de fichiers
    rules: [
      {
        // Spécifiez une règle pour le traitement des fichiers JavaScript
        test: /\.js$/,
        // Excluez les fichiers dans le répertoire node_modules du traitement
        exclude: /node_modules/,
        // Utilisez le babel-loader pour traiter les fichiers JavaScript
        use: 'babel-loader',
      },
      {
        // Spécifiez une règle pour le traitement des fichiers CSS
        test: /\.css$/,
        // Utilisez le MiniCssExtractPlugin.loader et css-loader pour traiter les fichiers CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  // Spécifiez un tableau de plugins à utiliser
  plugins: [
    // Utilisez le UglifyJsPlugin pour minifier le code JavaScript
    new UglifyJsPlugin(),
    // Utilisez le MiniCssExtractPlugin pour extraire le CSS dans un fichier séparé
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
  ],
};