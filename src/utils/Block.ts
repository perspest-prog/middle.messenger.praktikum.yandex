import EventBus from "./EventBus";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-mount",
        FLOW_RENDER: "flow:render"
    }

    protected props: Record<string, unknown>;
    private readonly eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _meta: { tagName: HTMLElementTagNameMap | string, props: any};

    /** JSDoc
   * @param {HTMLElementTagNameMap | string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
    constructor(tagName: HTMLElementTagNameMap | string, props: any) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        }

        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    protected init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount() {}

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected render(): string {
        return ''
    }

    private _render() {
        const block = this.render();

        this._element!.innerHTML = block;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _makePropsProxy(props: any): Record<string, unknown> {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет прав');
                }

                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет прав');
                }
                
                const oldProps = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

                return true;
            },
            deleteProperty(target, prop) {
              throw new Error('Нет прав')  
            },
        })
    }

    private _createResources(): void {
        const {tagName} = this._meta;
        this._element = document.createElement(tagName)
    }

    public setProps(newProps: any) {
        if (!newProps) {
            return;
        }

        Object.assign(this.props, newProps);
    }

    public getContent() {
        return this._element;
    }
}

export default Block;
