import { Chat } from "../types";
import BaseAPI from "./BaseAPI";

class ChatsAPI extends BaseAPI {
    constructor() {
        super("/chats");
    }

    public getChats() {
        return this.http.get<Chat[]>("/");
    }
}

export default ChatsAPI;
