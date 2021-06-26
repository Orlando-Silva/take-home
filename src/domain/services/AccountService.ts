import { injectable } from 'tsyringe'
import AccountRepository from '../../infrastructure/repositories/AccountRepository'
import Account from '../models/Account'
import NonExistingAccountException from '../models/exceptions/NonExistingAccountException'
import { TransactionType } from '../models/TransactionType'

@injectable()
export default class AccountService {

    constructor(private readonly accountRepository: AccountRepository) { }

    reset = () => this.accountRepository.reset()
    
    getBalanceById(accountId: number): number {
        const account = this.accountRepository.getById(accountId)

        if(account === undefined)
            throw new NonExistingAccountException(`Account ${ accountId } does not exist`)
                
        return account!.balance    
    }

    createTransaction(accountId: number, amount: number, type: TransactionType): Account {
        
        const account = type == TransactionType.Deposit
            ? this.createDeposit(accountId, amount)
            : this.createWithdraw(accountId, amount)

        this.accountRepository.update(account)    
        return account
    }

    private createDeposit(accountId: number, amount: number) {
        let account = this.accountRepository.getById(accountId) 
             ?? this.accountRepository.create(accountId)      

        account.balance += amount
        return account
    } 

    private createWithdraw(accountId: number, amount: number): Account {
        let account = this.accountRepository.getById(accountId) 

        if(account == undefined)
            throw new NonExistingAccountException(`Account ${ accountId } does not exist`)

        account.balance -= amount
        return account
    }
}
