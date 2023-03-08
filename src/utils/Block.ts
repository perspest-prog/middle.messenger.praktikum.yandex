import EventBus from "./EventBus";
import { nanoid } from 'nanoid';


export interface Props{
  className?: string[];
  id?: string;
  events?: Record<string, (event?: Event) =>void>
}

// Нельзя создавать экземпляр данного класса
class Block<IProps extends Props> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: IProps;
  public children: Record<string, (Block<IProps> | Array<Block<IProps>>)>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any; };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: keyof HTMLElementTagNameMap = "div", propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props
    };

    this.children = children;
    this.props = this._makeItProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, any> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block || (value instanceof Array && value.every((B => B instanceof Block)))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const {events = {}} = this.props as { events: Record<string, () =>void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = document.createElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (child instanceof Array) child.forEach(B => B.dispatchComponentDidMount());
      else child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    if (this.props.className) this._element!.classList.add(...this.props.className);

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any): DocumentFragment {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (component instanceof Array) {
        contextAndStubs[name] = component.map((B => `<div data-id="${B.id}"></div>`))
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (component instanceof Array) {
        component.forEach((B) => {
          const stub = temp.content.querySelector(`[data-id="${B.id}"]`);

          if (!stub) {
            return;
          }

          B.getContent()?.append(...Array.from(stub.childNodes));

          stub.replaceWith(B.getContent()!);
        })
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
          return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getContent()!);
      }
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makeItProxy(props: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
}

export default Block;
