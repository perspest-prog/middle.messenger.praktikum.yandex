/* eslint-disable @typescript-eslint/no-explicit-any */
import EventBus from "./EventBus";
import { nanoid } from 'nanoid';


export interface Props{
  className?: string[];
  id?: string;
  events?: Record<string, (event: Event) =>void>
}

// Нельзя создавать экземпляр данного класса
abstract class Block<IProps extends Props = Props> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private id = nanoid(6);
  protected props: IProps;
  protected children: Record<string, Block | Block[]>;
  private eventBus: () => EventBus;
  private _element: HTMLElement;

  constructor(propsWithChildren: IProps) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makeItProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: object) {
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
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = document.createElement("div");
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;
    this._element.replaceWith(newElement);
    this._element = newElement;

    if (this.props.className) this._element!.classList.add(...this.props.className);

    this._addEvents();
  }

  protected compile(template: HandlebarsTemplateDelegate,  context: any): DocumentFragment {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (component instanceof Array) {
        contextAndStubs[name] = component.map((B => `<div data-id="${B.id}"></div>`));
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent().append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent());
    };

    Object.entries(this.children).forEach(([, component]) => {
      if (component instanceof Array) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

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
