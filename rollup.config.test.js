import babel from '@rollup/plugin-babel';
import multiEntry from '@rollup/plugin-multi-entry';

export default {
	input: "src/**/*.spec.js",
	plugins: [babel({ babelHelpers: "bundled" }), multiEntry()],
	output: {
		file: "test/bundle.js",
		format: "cjs",
		sourcemap: true,
	},
	external: [
		"chai",
		"sinon",
		"mocha-sinon",
		"immutable",
		"core-js/modules/web.dom-collections.iterator.js",
		"core-js/modules/es.array.includes.js",
	],
};
