import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    // collectCoverage: true, // generates a test coverage report each time your tests run
    // collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'] // get all .ts files in the app directory
}

export default config