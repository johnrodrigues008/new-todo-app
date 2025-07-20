"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/$1',
        '^database/(.*)$': '<rootDir>/database/$1',
        '^users/(.*)$': '<rootDir>/users/$1',
        '^auth/(.*)$': '<rootDir>/auth/$1',
    },
};
//# sourceMappingURL=jest.config.js.map