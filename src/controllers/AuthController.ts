import AuthAPI from "../API/AuthAPI";
import Router from "../utils/Router";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signup(data: any) {
        try {
            await this.api.signup(data);
        } catch (e) {
            console.log(e);
        }
    }

    async signin(data: any) {
        try {
            await this.api.signin(data);

            await this.getUser();

            Router.navigate("/chat");
        } catch (e) {
            console.error(e);
        }
    }

    async logout() {
        try {
            await this.api.logout();
        } catch (e) {
            console.log(e);
        }
    }

    async getUser() {
        const user = await this.api.getUser();
        console.log(user);
    }
}

export default new AuthController();
