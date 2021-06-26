import { singleton } from 'tsyringe'
import Account from '../../domain/models/Account'

@singleton()
export default class AccountRepository {

    private accounts: Account[] = []

    reset = () => this.accounts = []

    getById(id: number): Account | undefined {
        return this.accounts.find(account => account.id == id)
    }

    create(id: number): Account {
        const account: Account = {
            id: id,
            balance: 0
        }
        this.accounts.push(account)
        return account
    }

    update(account: Account): Account {
        const existingAccount = this.accounts.find(a => a.id == account.id)

        if(existingAccount !== undefined) {
            this.accounts[this.accounts.indexOf(existingAccount)] = account
        }

        return account
    }

}