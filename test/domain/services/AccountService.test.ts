import 'reflect-metadata'
import { container } from 'tsyringe'
import Account from '../../../src/domain/models/Account';
import NonExistingAccountException from '../../../src/domain/models/exceptions/NonExistingAccountException';
import { TransactionType } from '../../../src/domain/models/TransactionType';
import AccountService from '../../../src/domain/services/AccountService'

let accountService = container.resolve(AccountService)

beforeEach(() => {
    container.clearInstances() // Flush singleton instances to make sure repository won't carry anything from other tests.
    accountService = container.resolve(AccountService)
})

describe('Deposits Tests', () => {

    test('Create account with initial balance', () => {
        const expectedResult = createMockAccount(100, 10)
        const actualResult = accountService.createTransaction(100, 10, TransactionType.Deposit)

        expect(actualResult).toStrictEqual(expectedResult)
    })

    test('Deposit into existing account', () => {
        const expectedResult = createMockAccount(100, 20)

        accountService.createTransaction(100, 10, TransactionType.Deposit)
        const actualResult = accountService.createTransaction(100, 10, TransactionType.Deposit)

        expect(actualResult).toStrictEqual(expectedResult)
    })

})

describe('Withdraw Tests', () => {

    test('Withdraw from non-existing account', () => {

        const expectedAccount = createMockAccount(100, 15)

        let account = accountService.createTransaction(100, 20, TransactionType.Deposit)
        account = accountService.createTransaction(100, 5, TransactionType.Withdraw)

        expect(account).toStrictEqual(expectedAccount)
    })

})

describe('Get Balance Tests', () => {

    test('Get balance for non-existing account', () => {
        expect(() => accountService.getBalanceById(1234)).toThrowError(NonExistingAccountException)
    })

    test('Get balance for existing account', () => {
        accountService.createTransaction(1, 100, TransactionType.Deposit)
        const actualBalance = accountService.getBalanceById(1)
        expect(actualBalance).toBe(100)
    })

})

describe('Reset State Tests', () => {

    test('Reset state before starting tests', () => {
        expect(accountService.reset()).toEqual([])  
    })

})


function createMockAccount(id: number, balance: number) : Account  {
    return { 
        id: id,
        balance: balance
    }
}
