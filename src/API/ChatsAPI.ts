import BaseAPI from "./BaseAPI";
import { Chat } from "../types";

class ChatsAPI extends BaseAPI {
    constructor() {
        super("/chats");
    }

    getChats() {
        return this.http.get<Chat[]>("/");
    }

    createChat(data: {title: string}) {
        return this.http.post("/", {data});
    }

    deleteChat(data: {chatId: number}) {
        return this.http.delete("/", {data});
    }

    getToken(chatId: number) {
        return this.http.post<{token: string}>(`/token/${chatId}`);
    }
}

export default ChatsAPI;
