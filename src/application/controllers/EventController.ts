import { Request, Response, Router } from 'express'
import { injectable } from 'tsyringe'
import Account from '../../domain/models/Account'
import { TransactionType } from '../../domain/models/TransactionType'
import AccountService from '../../domain/services/AccountService'

@injectable()
export default class EventController {

    private readonly router: Router

    constructor(private readonly accountService: AccountService) {
        this.router = Router()
    }

    reset(res: Response) {
        this.accountService.reset()
        res.status(200).send('OK')
    }

    getBalanceById(req: Request, res: Response) {
        try {
            return res.status(200).json (
                this.accountService.getBalanceById(parseInt(req.query.account_id!.toString()))
            )
        } catch(e) {
            res.status(404).json(0)
        }
    }
  
    event(req: Request, res: Response) {
        try {

            const response = req.body.type == TransactionType.Transfer
                ? this.createMultipleTransactionFromEvent(req)
                : this.createTransactionFromEvent(req) 

            return res.status(201).send(
                response
            )

        } catch(e) {
            res.status(404).json(0)
        }
    }

    routes() {
        this.router.post('/reset', (_req, res) => res.send(this.reset(res)))
        this.router.get('/balance', (_req, res) => res.send(this.getBalanceById(_req, res)))
        this.router.post('/event', (_req, res) => res.send(this.event(_req, res)))
        return this.router
    }

    private createTransactionFromEvent(req: Request) {
        const account = this.accountService.createTransaction(
            (req.body.destination ?? req.body.origin)!, 
            req.body.amount,
            req.body.type
        )

        return this.createResponse(req.body.type, account)
    }

    private createMultipleTransactionFromEvent(req: Request) {
        const withdrawAccount = this.accountService.createTransaction(req.body.origin, req.body.amount, TransactionType.Withdraw)
        const depositAccount = this.accountService.createTransaction(req.body.destination, req.body.amount, TransactionType.Deposit)

        const withdrawResponse = this.createResponse(req.body.type, withdrawAccount) 
        const depositResponse = this.createResponse(req.body.type, depositAccount) 
        
        return {
            withdrawResponse,
            depositResponse
        }
    }

    private createResponse(type: TransactionType, account: Account) {
        return type == TransactionType.Deposit 
            ? { 
                destination: {
                    id: account.id,
                    balance: account.balance
                }  
            } : { 
                origin: {
                    id: account.id,
                    balance: account.balance
                }  
            } 
    }
  
}