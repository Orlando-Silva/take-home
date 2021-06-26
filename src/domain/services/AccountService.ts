import { injectable } from 'tsyringe'
import AccountRepository from '../../infrastructure/repositories/AccountRepository'
import Account from '../models/Account'
import NonExistingAccountException from '../models/exceptions/NonExistingAccountException'

@injectable()
export default class AccountService {

    constructor(private readonly accountRepository: AccountRepository) { }

    reset = () => this.accountRepository.reset()
    
    getBalanceById(accountId: number): number {
        throw new NonExistingAccountException(`Account ${accountId} does not exist!`)
    }

    createTransaction(accountId: number, amount: number): Account {
        let account = this.accountRepository.getById(accountId) 
            ?? this.accountRepository.create(accountId)      
                    
        account.balance += +amount
        this.accountRepository.update(account)
        
        return account
    }

}
