import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess';
import { SessionToken } from '../../app/Models/ServerModels'
import Nedb = require("nedb");

jest.mock('nedb');

describe('sessionTokenDBAccess test suite', () => {
    let sessionTokenDBAccess = new SessionTokenDBAccess;

    const nedbMock = {
        loadDatabase: jest.fn(),
        insert: jest.fn(),
        find: jest.fn()
    }

    const testToken: SessionToken = {
        accessRights: [],
        expirationTime: new Date(),
        tokenId: '12345',
        userName: 'Corey',
        valid: true
    }

    const testTokenId = '123';

    beforeEach(() => {
        sessionTokenDBAccess = new SessionTokenDBAccess(nedbMock as any);
        expect(nedbMock.loadDatabase).toBeCalled();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('store sessionToken without error', async () => { 
        nedbMock.insert.mockImplementationOnce(
            (testToken: any, callback: any) => callback()
        );

        await sessionTokenDBAccess.storeSessionToken(testToken);
        expect(nedbMock.insert).toBeCalledWith(testToken, expect.any(Function));
    })
    
    test('store sessionToken with error', async () => { 
        nedbMock.insert.mockImplementationOnce(
            (testToken: any, callback: any) => callback(new Error('something went wrong'))
        );

        // check for a correct callback error
        await expect(sessionTokenDBAccess.storeSessionToken(testToken)).rejects.toThrow('something went wrong');
        expect(nedbMock.insert).toBeCalledWith(testToken, expect.any(Function));
    })

    test('get token with result and no error', async () => {
        const bar = (testTokenId: string, callback: any) => callback(null, [testToken])
        nedbMock.find.mockImplementationOnce(bar);
        const getTokenResult = await sessionTokenDBAccess.getToken(testTokenId);

        expect(getTokenResult).toBe(testToken);
        expect(nedbMock.find).toBeCalledWith({ tokenId: testTokenId }, expect.any(Function));
    });

    test('get token with no result and no error', async () => {
        const bar = (testTokenId: string, callback: any) => callback(null, [])
        nedbMock.find.mockImplementationOnce(bar);
        const getTokenResult = await sessionTokenDBAccess.getToken(testTokenId);

        expect(getTokenResult).toBeNull;
        expect(nedbMock.find).toBeCalledWith({ tokenId: testTokenId }, expect.any(Function));
    });

    test('get token with error', async () => {
        const bar = (testTokenId: string, callback: any) => callback(new Error("something went wrong"), [])
        nedbMock.find.mockImplementationOnce(bar);
        await expect(sessionTokenDBAccess.getToken(testTokenId)).rejects.toThrow("something went wrong");

        expect(nedbMock.find).toBeCalledWith({ tokenId: testTokenId }, expect.any(Function));
    });

    test('constructor argument', async () => {
        new SessionTokenDBAccess();
        expect(Nedb).toBeCalledWith('databases/sessionToken.db')
    });
})