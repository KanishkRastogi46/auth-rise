import { Errors } from "./enum/errors.enum"

export class NotFoundException extends Error {
    public status: number
    public name: string
    public timestamp: string
    constructor(
        public message: string
    ) {
        super(message)
        this.name = Errors.NotFoundException
        this.status = 404
        this.timestamp = new Date().toISOString()

        if (this.stack) {
            console.error(this.stack)
        }
    }
}