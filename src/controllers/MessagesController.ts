import Store from "../core/Store";
import WSTransport from "../core/WSTransport";

class MessagesController {
    static API_URL = "wss://ya-praktikum.tech/ws/chats";
    private sockets = new Map<number, WSTransport>();

    async connect(chatId: number, token: string) {
        if (this.sockets.has(chatId)) {
            return;
        }

        const { id: userId } = Store.getState().user;
        const ws = new WSTransport();

        this.sockets.set(chatId, ws);
    }
}

export default new MessagesController();
