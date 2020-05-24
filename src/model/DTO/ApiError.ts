export class ApiError {
    private readonly code: number;
    private readonly message: string;

    constructor(code: number, message: string)
    {
        this.code = code;
        this.message = message;
    }

    public getCode(): number
    {
        return this.code;
    }

    public getMessage(): string
    {
        return this.message;
    }
}