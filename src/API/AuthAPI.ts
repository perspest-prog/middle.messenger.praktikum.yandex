import BaseAPI from "./BaseAPI";

class AuthAPI extends BaseAPI {
    constructor() {
        super("/auth");
    }

    public signin(data: object): Promise<XMLHttpRequest> {
        return this.http.post("/signin", {data: data});
    }

    public signup(data: object): Promise<XMLHttpRequest> {
        return this.http.post("/signup", data);
    }

    public getUser(): Promise<XMLHttpRequest> {
        return this.http.get("/user");
    }

    public logout(): Promise<XMLHttpRequest> {
        return this.http.post("/logout");
    }
}

export default AuthAPI;
