import { injectable } from 'tsyringe'
import AccountRepository from '../../infrastructure/repositories/AccountRepository'
import NonExistingAccountException from '../models/exceptions/NonExistingAccountException'

@injectable()
export default class AccountService {

    constructor(private readonly accountRepository: AccountRepository) { }

    getBalanceById(accountId: number): number {
        throw new NonExistingAccountException(`Account ${accountId} does not exist!`)
    }

    reset = () => this.accountRepository.reset()

}
