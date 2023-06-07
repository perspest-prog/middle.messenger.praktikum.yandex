import BaseAPI from "./BaseAPI";
import { User } from "../types";

class AuthAPI extends BaseAPI {
    constructor() {
        super("/auth");
    }

    public signin(data: object) {
        return this.http.post("/signin", {data});
    }

    public signup(data: object) {
        return this.http.post("/signup", {data});
    }

    public getUser() {
        return this.http.get<User>("/user");
    }

    public logout() {
        return this.http.post("/logout");
    }
}

export default AuthAPI;
