export default class CustomError extends Error {
    constructor(name, cause, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.cause = cause;
        this.message = message;
    }
}

