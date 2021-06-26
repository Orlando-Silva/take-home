import 'reflect-metadata'
import { container } from 'tsyringe'
import Account from '../../../src/domain/models/Account';
import NonExistingAccountException from '../../../src/domain/models/exceptions/NonExistingAccountException';
import AccountService from '../../../src/domain/services/AccountService'

describe('Account Service Tests', () => {

    let accountService = container.resolve(AccountService)

    test('Reset state before starting tests', () => {
        expect(accountService.reset()).toEqual([])  
    });

    test('Get balance for non-existing account', () => {
        expect(() => accountService.getBalanceById(1234)).toThrowError(NonExistingAccountException)
    });

    test('Create account with initial balance', () => {

        const expectedResult: Account = {
            id: 100,
            balance: 10
        }

        const actualResult = accountService.createTransaction(100, 10)

        expect(actualResult).toStrictEqual(expectedResult)
    });

});