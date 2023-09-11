import EventBus from "./EventBus";
import { State } from "../types";

export enum StoreEvents {
    Updated = 'updated',
}

type StateType<T extends Store<unknown>> = T extends Store<infer S> ? S : never;

class Store<T> extends EventBus {
    private state = {} as T;

    public set<K extends keyof T>(path: K, value: T[K]) {
        this.state[path] = value;

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

export default new Store<State>();
export { StateType };
