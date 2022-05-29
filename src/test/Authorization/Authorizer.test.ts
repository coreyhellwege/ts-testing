import { Authorizer } from '../../app/Authorization/Authorizer'
import { HTTP_METHODS, HTTP_CODES, SessionToken, Account, TokenState } from '../../app/Models/ServerModels'
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess'
import { UserCredentialsDbAccess } from '../../app/Authorization/UserCredentialsDbAccess'

// jest.mock() mocks an entire module
jest.mock('../../app/Authorization/SessionTokenDBAccess')
jest.mock('../../app/Authorization/UserCredentialsDbAccess')

const testAccount: Account = {
    username: 'someUser',
    password: 'somePassword'
}

describe('Authorizer test suite', () => {
    let authorizer: Authorizer

    let sessionTokenDBAccessMock = {
        storeSessionToken: jest.fn(),
        getToken: jest.fn()
    }

    let userCredentialsDBAccessMock = {
        getUserCredential: jest.fn()
    }

    beforeEach(() => {
        authorizer = new Authorizer(
            sessionTokenDBAccessMock as any,
            userCredentialsDBAccessMock as any
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('constructor arguments', () => {
        new Authorizer()
        expect(SessionTokenDBAccess).toBeCalledTimes(1)
        expect(UserCredentialsDbAccess).toBeCalledTimes(1)
    })

    describe('login user tests suite', () => {
        test('should return null if invalid credentials', async () => {
            userCredentialsDBAccessMock.getUserCredential.mockReturnValue(null)
            const loginResult = await authorizer.generateToken(testAccount)
            expect(loginResult).toBeNull
            expect(userCredentialsDBAccessMock.getUserCredential).
                toBeCalledWith(testAccount.username, testAccount.password)
        })

        test('should return session token for valid login credentials', async () => {
            // use Jest spies to replace the Math.random and Date.now global methods with values which will remain the same during our test
            // Jest spyOn simply replaces a function with a mock function
            jest.spyOn(global.Math, 'random').mockReturnValueOnce(0)
            jest.spyOn(global.Date, 'now').mockReturnValueOnce(0)
            userCredentialsDBAccessMock.getUserCredential.mockReturnValue({
                accessRights: [1, 2, 3],
                username: 'someUser',
                password: 'somePassword'
            })
            const expectedSessionToken: SessionToken = {
                accessRights: [1, 2, 3],
                userName: 'someUser',
                valid: true,
                expirationTime: new Date(1000 * 60 * 60),
                tokenId: ''
            }
            const sessionToken = await authorizer.generateToken(testAccount)
            expect(expectedSessionToken).toStrictEqual(sessionToken)
            expect(sessionTokenDBAccessMock.storeSessionToken).toHaveBeenCalledWith(sessionToken)
        })
    })

    describe('validateToken tests', () => {
        test('validateToken returns invalid for null token', async () => {
            sessionTokenDBAccessMock.getToken.mockReturnValueOnce(null)
            const sessionToken = await authorizer.validateToken('123')
            expect(sessionToken).toStrictEqual({
                accessRights: [],
                state: TokenState.INVALID
            })
        })

        test('validateToken returns expired for expired tokens', async () => {
            const dateInPast = new Date(Date.now() - 1)
            sessionTokenDBAccessMock.getToken.mockReturnValueOnce({ valid: true, expirationTime: dateInPast })
            const sessionToken = await authorizer.validateToken('123')
            expect(sessionToken).toStrictEqual({
                accessRights: [],
                state: TokenState.EXPIRED
            })
        })

        test('validateToken returns valid for not expired and valid tokens', async () => {
            const dateInFuture = new Date(Date.now() + 100000)
            sessionTokenDBAccessMock.getToken.mockReturnValue(
                {
                    valid: true,
                    expirationTime: dateInFuture,
                    accessRights: [1]
                })
            const sessionToken = await authorizer.validateToken('123')
            expect(sessionToken).toStrictEqual({
                accessRights: [1],
                state: TokenState.VALID
            })
        })
    })
})