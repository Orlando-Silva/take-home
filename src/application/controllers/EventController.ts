import { Request, Response, Router } from 'express'
import { injectable } from 'tsyringe'
import TransactionEvent from '../../domain/models/TransactionEvent'
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
            const event: TransactionEvent = {
                amount: req.body.amount,
                type: req.body.type,
                destination: req.body.destination
            }
        
            const account = this.accountService.createTransaction(event.destination, event.amount)

            return res.status(201).send({
                destination: {
                    id: account.id,
                    balance: account.balance
                }
            })

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

    
}