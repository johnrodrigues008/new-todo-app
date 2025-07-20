declare const _default: {
    moduleFileExtensions: string[];
    rootDir: string;
    testRegex: string;
    transform: {
        '^.+\\.(t|j)s$': string;
    };
    collectCoverageFrom: string[];
    coverageDirectory: string;
    testEnvironment: string;
    moduleNameMapper: {
        '^src/(.*)$': string;
        '^database/(.*)$': string;
        '^users/(.*)$': string;
        '^auth/(.*)$': string;
    };
};
export default _default;
