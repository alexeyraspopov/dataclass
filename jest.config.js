module.exports = {
	collectCoverage: true,
	testMatch: ["**/__tests__/*-test.js"],
	transform: {
		"\\.js$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-flow"] }],
	},
};
