import { LoginHandler } from '../../app/Handlers/LoginHandler'
import { HTTP_METHODS, HTTP_CODES, SessionToken } from '../../app/Models/ServerModels'
import { Utils } from '../../app/Utils/Utils'

describe('LoginHandler test suite', () => {
    let loginHandler: LoginHandler

    const requestMock = {
        method: ''
    }

    const responseMock = {
        writeHead: jest.fn(), // mock function
        write: jest.fn(),
        statusCode: 0
    }
    
    const authorizerMock = {
        generateToken: jest.fn()
    }

    const getRequestBodyMock = jest.fn()

    // create a stub for session token
    const testSessionToken: SessionToken = {
        tokenId: 'someTokenId',
        userName: 'someUserName',
        valid: true,
        expirationTime: new Date(),
        accessRights: [1,2,3]
    }

    beforeEach(() => {
        // Instantiate the constructor
        loginHandler = new LoginHandler(
            requestMock as any,
            responseMock as any,
            authorizerMock as any
        )

        Utils.getRequestBody = getRequestBodyMock // Mock the Utils.getRequestBody() method
        requestMock.method = HTTP_METHODS.POST
    })

    afterEach(() => {
        jest.clearAllMocks() // good practice to always clear mocks after tests run
    })

    test('options request', async () => {
        requestMock.method = HTTP_METHODS.OPTIONS
        await loginHandler.handleRequest()
        expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK)
    })

    test('not handled http method', async () => {
        requestMock.method = 'randomMethod'
        await loginHandler.handleRequest()
        expect(responseMock.writeHead).not.toHaveBeenCalled()
    })

    test('post request with a valid login', async () => {
        // setup requestBody which needs to be of type Account
        getRequestBodyMock.mockReturnValueOnce({
            username: 'corey',
            password: '123456'
        })

        // setup token
        authorizerMock.generateToken.mockReturnValueOnce(testSessionToken)

        await loginHandler.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toBeCalledWith(JSON.stringify(testSessionToken))
    })

    test('post request with an invalid login', async () => {
        // setup requestBody which needs to be of type Account
        getRequestBodyMock.mockReturnValueOnce({
            username: 'corey',
            password: '123456'
        })

        // setup an invalid token
        authorizerMock.generateToken.mockReturnValueOnce(null)

        await loginHandler.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND)
        expect(responseMock.write).toBeCalledWith('wrong username or password')
    })

    test('post request with an unexpected error', async () => {
        // throw an error at the getRequestBodyMock step
        getRequestBodyMock.mockRejectedValueOnce(new Error('something went wrong'))

        await loginHandler.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.INTERNAL_SERVER_ERROR)
        expect(responseMock.write).toBeCalledWith('Internal error: something went wrong')
    })
})