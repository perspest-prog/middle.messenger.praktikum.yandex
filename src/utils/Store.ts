import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

interface State {
    error?: {
        code: number;
        reason?: string;
    }
    user: object;
    chats: object[];
    messages: object[];
}

class Store extends EventBus {
    private state: State;

    public set(path: keyof State, value: any) {
        this.state[path] = value;

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

export default new Store();
