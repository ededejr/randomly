/* eslint-disable no-undef */
module.exports = {
	moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx', 'json', 'node'],
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	testRegex: '(/tests/.*|(\\.|/)(test))\\.tsx?$',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
