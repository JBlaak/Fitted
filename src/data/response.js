export default class Response {

    setError(error) {
        this.error = error;
    }

    getError() {
        return this.error || null;
    }

    setStatus(status) {
        this.status = parseInt(status, 10);
    }

    getStatus() {
        return this.status || null;
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    getHeaders() {
        return this.headers || {};
    }

    setBody(body) {
        this.body = body;
    }

    getBody() {
        return this.body || null;
    }

    isOk() {
        return !this.error && this.status !== null && String(this.status).startsWith('2');
    }
}
