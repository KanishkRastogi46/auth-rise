import { Errors } from "./enum/errors.enum"

export class ForbiddenException extends Error {
    public status: number
    public name: string
    public timestamp: string
    constructor(
        public message: string
    ) {
        super(message)
        this.name = Errors.ForbiddenException
        this.status = 403
        this.timestamp = new Date().toISOString()
    }

    getMessage(): string {
        return this.message
    }

    getStatus(): number {
        return this.status
    }

    getName(): string {
        return this.name
    }

    getResponse() {
        return {
            status: this.getStatus(),
            message: this.getMessage(),
            timestamp: new Date().toISOString(),
        }
    }
}