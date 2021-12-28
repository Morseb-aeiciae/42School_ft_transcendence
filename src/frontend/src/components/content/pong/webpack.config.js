const path = require('path');

module.exports = {
  entry: './index.ts',
  mode: 'development',
  module: {
	rules: [
		{
		   test: /\.tsx?$/,
		   loader: 'ts-loader',
		   options: {
			  compilerOptions: {
				 "noEmit": false
			  }
		   },
		   exclude: /node_modules/,
		 },
    ],
  },
  plugins: [
    {
       apply: (compiler) => {
         compiler.hooks.done.tap('DonePlugin', (stats) => {
           console.log('Compile is done !')
           setTimeout(() => {
             process.exit(0)
           })
         });
       }
    }
],
exclude: [
    'Game.tsx'
  ],
performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../../../public'),
  },
};