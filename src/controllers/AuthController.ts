import AuthAPI from "../API/AuthAPI";
import Router from "../core/Router";
import Store from "../core/Store";
import { SignInData, SignUpData } from "../types";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signup(data: SignUpData) {
        try {
            await this.api.signup(data);

            await this.getUser();

            Router.navigate("/chat");
        } catch (e) {
            Store.set("error", e);
        }
    }

    async signin(data: SignInData) {
        try {
            await this.api.signin(data);

            await this.getUser();

            Router.navigate("/chat");
        } catch (e) {
            Store.set("error", e);
        }
    }

    async logout() {
        try {
            await this.api.logout();

            Store.set("user", undefined);

            Router.navigate("/login");
        } catch (e) {
            Store.set("error", e);
        }
    }

    async getUser() {
        const user = await this.api.getUser();
        Store.set("user", user);
    }
}

export default new AuthController();
