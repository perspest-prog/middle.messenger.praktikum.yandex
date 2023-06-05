import HTTPTransport from "../utils/HTTPTransport";

abstract class BaseAPI {
    static BASE_URL = "https://ya-praktikum.tech/api/v2";

    private url: string;
    protected http: HTTPTransport;

    constructor(url: string) {
        this.url = url;
        this.http = new HTTPTransport(BaseAPI.BASE_URL + url);
    }
}

export default BaseAPI;
