import { Errors } from "./enum/errors.enum"

export class InternalServerException extends Error {
    public status: number
    public name: string
    public timestamp: string
    constructor(
        public message: string
    ) {
        super(message)
        this.name = Errors.InternalServerErrorException
        this.status = 500
        this.timestamp = new Date().toISOString()

        if (this.stack) {
            console.error(this.stack)
            process.exit(1)
        }
    }
}