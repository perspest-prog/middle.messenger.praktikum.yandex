import MessagesController from "./MessagesController";
import ChatsAPI from "../API/ChatsAPI";
import Store from "../core/Store";

class ChatsController {
    private readonly api: ChatsAPI;
    constructor() {
        this.api = new ChatsAPI();
    }

    async fetchChats() {
        const chats = await this.api.getChats();

        chats.forEach(async ({id}) => {
            const { token } = await this.api.getToken(id);

            MessagesController.connect(id, token);
        });

        Store.set("chats", chats);
    }
    
    selectChat(chatId: number) {
        console.log(this, chatId);
    }
}

export default new ChatsController();
