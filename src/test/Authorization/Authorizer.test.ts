import { Authorizer } from '../../app/Authorization/Authorizer';
import { HTTP_METHODS, HTTP_CODES, SessionToken, Account } from '../../app/Models/ServerModels'
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess'
import { UserCredentialsDbAccess } from '../../app/Authorization/UserCredentialsDbAccess'

// jest.mock() mocks an entire module
jest.mock('../../app/Authorization/SessionTokenDBAccess')
jest.mock('../../app/Authorization/UserCredentialsDbAccess')

describe('Authorizer test suite', () => {
    let authorizer: Authorizer

    const sessionTokenDBAccessMock = {
        storeSessionToken: jest.fn()
    }

    const userCredentialsDbAccessMock = {
        getUserCredential: jest.fn()
    }

    const testAccount: Account = {
        username: 'corey',
        password: '123456'
    }

    beforeEach(() => {
        // Instantiate the constructor
        authorizer = new Authorizer(
            sessionTokenDBAccessMock as any,
            userCredentialsDbAccessMock as any
        )
    })

    afterEach(() => {
        jest.clearAllMocks() // good practice to always clear mocks after tests run
    })

    test('constructor arguments', () => {
        // Instantiate the constructor
        new Authorizer()
        expect(SessionTokenDBAccess).toBeCalled()
        expect(UserCredentialsDbAccess).toBeCalled()
    })

    test('should return sessionToken for valid login credentials', async () => {
        // use Jest spies to replace the Math.random and Date.now global methods with values which will remain the same during our test
        // Jest spyOn simply replaces a function with a mock function
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0)
        jest.spyOn(global.Date, 'now').mockReturnValueOnce(0)

        userCredentialsDbAccessMock.getUserCredential.mockResolvedValueOnce({
            username: 'corey',
            accessRights: [1,2,3]
        })

        const expectedSessionToken: SessionToken = {
            userName: 'corey',
            accessRights: [1,2,3],
            valid: true,
            tokenId: '',
            expirationTime: new Date(60 * 60 * 1000)
        }

        const sessionToken = await authorizer.generateToken(testAccount)
        expect(expectedSessionToken).toEqual(sessionToken)
        expect(sessionTokenDBAccessMock.storeSessionToken).toBeCalledWith(sessionToken)
    })
})