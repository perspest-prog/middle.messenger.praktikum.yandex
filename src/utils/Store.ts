import Block from "./Block";
import EventBus from "./EventBus";
import { User } from "../types";

export enum StoreEvents {
    Updated = 'updated',
}

interface State {
    error?: {
        code: number;
        reason?: string;
    }
    user?: User;
    chats?: object[];
    messages?: object[];
}

class Store extends EventBus {
    private state: State = {};

    public set<T extends keyof State>(path: T, value: State[T]) {
        this.state[path] = value;

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

const connect = <C extends new () => Block>(component: C, reducer: (state: State) => object) => {
    return class extends component {
        constructor(props: ConstructorParameters<C>) {
            super({...props, ...reducer(store.getState())});

            store.on(StoreEvents.Updated, () => {
                this.setProps({...reducer(store.getState())});
            });
        }
    };
};

export default store;
export { connect };
