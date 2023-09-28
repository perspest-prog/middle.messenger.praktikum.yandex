/* eslint-disable @typescript-eslint/no-explicit-any */
import EventBus from "./EventBus";
import { nanoid } from 'nanoid';


export interface Props{
  className?: string[];
  id?: string;
  events?: Record<string, (event: Event) =>void>
}

type PickChildrenKeys<T extends Props> = {
  [K in keyof T]: T[K] extends (Block | Block[]) ? never : K;
}[keyof T];

type PickPropsKeys<T extends Props> = {
  [K in keyof T]: T[K] extends (Block | Block[]) ? K : never;
}[keyof T];

type Children<T extends Props> = Omit<T, PickChildrenKeys<Required<T>>>;
type RealProps<T extends Props> = Omit<T, PickPropsKeys<Required<T>>>;

// Нельзя создавать экземпляр данного класса
abstract class Block<IProps extends Props = Props> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  private id = nanoid(6);
  protected props: RealProps<IProps> & Props;
  protected children: Children<IProps>;
  private eventBus = new EventBus();
  private element = document.createElement("temp") as Element;

  constructor(propsWithChildren: IProps) {
    const { props, children } = Block.getChildrenAndProps(propsWithChildren);

    this.children = this._makeItProxy(children);
    this.props = this._makeItProxy(props);

    this._registerEvents();

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private static getChildrenAndProps(childrenAndProps: object) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block || value instanceof Array && value.every((B): B is Block => B instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const {events = {}} = this.props as Props;

    Object.keys(events).forEach(eventName => {
      this.element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props as Props;

    Object.keys(events).forEach(eventName => {
      this.element.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    if (this.element.tagName === "TEMP") {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child: Block | Block[]) => {
      if (child instanceof Array) child.forEach(B => B.dispatchComponentDidMount());
      else child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: Partial<typeof this.props | typeof this.children>) => {
    if (!nextProps) {
      return;
    }
    const { props, children } = Block.getChildrenAndProps(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);
  };

  private _render() {
    const { firstElementChild: newElement } = this.render() as DocumentFragment & { firstElementChild: Element};
    this._removeEvents();

    const replaceSmart = (target: Element, source: Element, withAssign = true) => {
      if (!target.cloneNode(false).isEqualNode(source.cloneNode(false))) {
        target.replaceWith(source);
        if (withAssign) {
          this.element = source;
        }
      } else for (let i = 0; i < source.childElementCount; i++) {
        const first = target.children[i];
        const second = source.children[i];
        if (!first) {
          target.append(second);
        } else if (!first.isEqualNode(second)) {
          first.replaceWith(second.cloneNode(true));
        }
      }
    };

    this.element.replaceWith(newElement);
    this.element = newElement;

    if (this.props.className) this.element.classList.add(...this.props.className);

    this._addEvents();
  }

  protected compile(template: HandlebarsTemplateDelegate,  context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children as Record<string, Block | Block[]>).forEach(([name, component]) => {
      if (component instanceof Array) {
        contextAndStubs[name] = component.map(B => `<div data-id="${B.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const temp = document.createElement('template');

    temp.innerHTML = template(contextAndStubs);

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      //component.element.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.element);
    };

    Object.entries(this.children as Record<string, Block | Block[]>).forEach(([, component]) => {
      if (component instanceof Array) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  protected abstract render(): DocumentFragment;

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

        // Запускаем обновление компонента
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
}

export default Block;
