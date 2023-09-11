import Store, { StoreEvents, StateType } from "../core/Store";
import Block, { Props } from "../core/Block";

const connect = <T extends new (...args: any[]) => Block>(component: T, reducer: (state: StateType<typeof Store>) => T extends typeof Block<infer P extends Props> ? P : never) => {
    return class extends component {
        constructor(...props: any[]) {
            super({...props, ...reducer(Store.getState())});

            Store.on(StoreEvents.Updated, () => {
                this.setProps(reducer(Store.getState()));
            });
        }
    };
};

export default connect;
