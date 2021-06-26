import 'reflect-metadata'
import { container } from 'tsyringe'
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

});