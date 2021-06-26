import { Response, Router } from 'express'
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
  
    routes() {
        this.router.post('/reset', (_req, res) => res.send(this.reset(res)))
        return this.router
    }
}