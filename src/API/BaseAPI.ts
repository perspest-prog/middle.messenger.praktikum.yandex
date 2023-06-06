import HTTPTransport from "../utils/HTTPTransport";

abstract class BaseAPI {
    static BASE_URL = "https://ya-praktikum.tech/api/v2";

    protected http: HTTPTransport;

    constructor(url: string) {
        this.http = new HTTPTransport(BaseAPI.BASE_URL + url);
    }
}

export default BaseAPI;
