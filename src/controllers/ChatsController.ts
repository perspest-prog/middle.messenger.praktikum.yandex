import ChatsAPI from "../API/ChatsAPI";
import Store from "../core/Store";

class ChatsController {
    private readonly api: ChatsAPI;
    constructor() {
        this.api = new ChatsAPI();
    }

    async fetchChats() {
        const chats = await this.api.getChats();

        Store.set("chats", chats);
    }
}

export default new ChatsController();
