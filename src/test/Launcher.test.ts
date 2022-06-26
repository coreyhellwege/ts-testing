import { mocked } from 'ts-jest/utils'
import { Launcher } from '../app/Launcher'
import { Server } from '../app/Server/Server'

// Create a mocked implementation of the server
jest.mock('../app/Server/Server', () => {
    return {
        Server: jest.fn(() => {
            return {
                startServer: () => {
                    console.log('Starting fake server')
                }
            }
        })
    }
})

describe('Launcher test suite', () => {
    const mockedServer = mocked(Server, true) // deep mock
    test('Create server', () => {
        new Launcher()
        expect(mockedServer).toBeCalled()
    })
})
