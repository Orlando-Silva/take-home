import { injectable } from 'tsyringe';
import AccountRepository from '../../infrastructure/repositories/AccountRepository';

@injectable()
export default class AccountService {

    constructor(private readonly accountRepository: AccountRepository) { }
    
    reset = () => this.accountRepository.reset()

}
