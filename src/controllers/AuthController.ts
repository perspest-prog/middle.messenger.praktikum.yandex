import AuthAPI from "../API/AuthAPI";
import Router from "../utils/Router";
import store from "../utils/Store";
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
            store.set("error", e);
        }
    }

    async signin(data: SignInData) {
        try {
            await this.api.signin(data);

            await this.getUser();

            Router.navigate("/chat");
        } catch (e) {
            store.set("error", e);
        }
    }

    async logout() {
        try {
            await this.api.logout();

            store.set("user", undefined);

            Router.navigate("/login");
        } catch (e) {
            store.set("error", e);
        }
    }

    async getUser() {
        const user = await this.api.getUser();
        store.set("user", user);
    }
}

export default new AuthController();
