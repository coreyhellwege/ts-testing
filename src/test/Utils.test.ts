import { Utils } from '../app/Utils'

// test suite (takes a description string for the test suite and a callback function)
describe('Utils test suite', () => {
    // helper functions
    beforeEach(() => {
        console.log('before each hook');
    })

    beforeAll(() => {
        console.log('before all hooks');
    })

    // tests
    test.skip('first test', () => {
        const result = Utils.toUpperCase('abc')
        expect(result).toBe('ABC') // assertion
    })

    test('parse a simple URL', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login')
        expect(parsedUrl.href).toBe('http://localhost:8080/login')
        expect(parsedUrl.port).toBe('8080')
        expect(parsedUrl.protocol).toBe('http:')
        expect(parsedUrl.query).toEqual({})
    })

    test('parse a URL with query params', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login?user=corey&password=12345')
        const expectedQuery = {
            user: 'corey',
            password: '12345'
        }
        expect(parsedUrl.query).toEqual(expectedQuery)
    })

    test.todo('test xyz') // reminder to write a test
    // test.only('xyz', ... ) // only execute this test

    // Different ways of testing for errors:
    test('test invalid URL', () => {
        const expectError = () => Utils.parseUrl('')
        expect(expectError).toThrowError()
        expect(expectError).toThrow('Empty url')
    })

    test('test invalid URL with an arrow function expression', () => {
        expect(() => Utils.parseUrl('')).toThrow('Empty url')
    })

    test('test invalid URL with a try/catch', () => {
        try {
            Utils.parseUrl('')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error).toHaveProperty('message', 'Empty url')
        }
    })
})