enum HttpResponseStatus {
    NOT_FOUND = 404
}
class HttpRequestError extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string = '') {
        super();
        this.status = status;
        this.message = message;
    }
}

export { HttpResponseStatus, HttpRequestError }
