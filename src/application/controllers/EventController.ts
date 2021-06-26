import { Request, Response, Router } from 'express'
import { injectable } from 'tsyringe'
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
  
    routes() {
        this.router.post('/reset', (_req, res) => res.send(this.reset(res)))
        this.router.get('/balance', (_req, res) => res.send(this.getBalanceById(_req, res)))
        return this.router
    }

    
}