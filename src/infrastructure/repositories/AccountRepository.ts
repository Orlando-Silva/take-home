import { singleton } from 'tsyringe';
import Account from '../../domain/models/Account';

@singleton()
export default class AccountRepository {

    private accounts: Account[] = []

    reset = () => this.accounts = []

}