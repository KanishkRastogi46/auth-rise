import { Errors } from "./enum/errors.enum"

export class HttpException extends Error {
    private timestamp: string
    constructor(
        public message: string,
        public status: number = 500,
    ) {
        super(message)
        this.name = Errors.HttpException
        this.status = status
        this.timestamp = new Date().toISOString()

        if (this.stack) {
            console.error(this.stack)
            process.exit(1)
        }
    }
}