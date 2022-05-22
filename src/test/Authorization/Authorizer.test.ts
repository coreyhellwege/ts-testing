import { Authorizer } from '../../app/Authorization/Authorizer';
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess'
import { UserCredentialsDbAccess } from '../../app/Authorization/UserCredentialsDbAccess'

// jest.mock() mocks an entire module
jest.mock('../../app/Authorization/SessionTokenDBAccess')
jest.mock('../../app/Authorization/UserCredentialsDbAccess')

describe('Authorizer test suite', () => {
    let authorizer: Authorizer

    test('constructor arguments', () => {
        // Instantiate the constructor
        new Authorizer()
        expect(SessionTokenDBAccess).toBeCalled()
        expect(UserCredentialsDbAccess).toBeCalled()
    })
})