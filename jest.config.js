module.exports = {
	collectCoverage: true,
	transform: {
		'\\.js$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-flow'] }],
	},
};
