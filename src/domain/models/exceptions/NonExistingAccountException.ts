export default class NonExistingAccountException extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, NonExistingAccountException.prototype)
    }
}