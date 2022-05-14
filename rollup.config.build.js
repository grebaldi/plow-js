import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "src/index.js",
	output: {
		name: "plow",
		file: "dist/index.js",
		format: "umd",
	},
	plugins: [babel(), nodeResolve()],
};
