import EventBus from "./EventBus";

class WSTransport extends EventBus {
    private socket: WebSocket
    constructor() {
        super();
    }
}

export default WSTransport;
