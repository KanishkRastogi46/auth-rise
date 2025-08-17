import { Errors } from "./enum/errors.enum"

export class BadRequestException extends Error {
    public status: number
    public name: string
    public timestamp: string
    constructor(
        public message: string
    ) {
        super(message)
        this.name = Errors.BadRequestException
        this.status = 400
        this.timestamp = new Date().toISOString()

        if (this.stack) {
            console.error(this.stack)
            process.exit(1)
        }
    }
}