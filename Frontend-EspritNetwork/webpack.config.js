import path from "path";
import process from "process";

export default {
	mode: "development", // Add this line to set the mode
	entry: "./src/main.js", // Entry file for webpack
	output: {
		path: path.resolve(process.cwd(), "dist"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"],
					},
				},
			},
		],
	},
};
