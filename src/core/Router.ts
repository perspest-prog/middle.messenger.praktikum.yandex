import Block from "./Block";

export class Route {
    private page: Block | null = null;
    private pathname: string;
    private pageType: new () => Block;

    constructor(pathname: string, pageType: new () => Block) {
        this.pathname = pathname;
        this.pageType = pageType;
    }

    public on(element: HTMLElement): void {
        if (!this.page) {
            this.page = new this.pageType;
        }
        
        element.append(this.page.getContent());
        this.page.dispatchComponentDidMount();
    }

    public off(element: HTMLElement): void {
        element.innerHTML = "";
        this.page = null;
    }

    public match(pathname: string): boolean {
        return this.pathname === pathname;
    }
}

class Router {
    private routes: Route[] = [];
    private currentRoute: Route | null  = null;
    private root: HTMLElement;
    private currentPath = window.location.pathname;

    constructor(root: string) {
        const rootElement = document.getElementById(root);
        if (!rootElement) {
            throw new Error("Не найден root элемент");
        }
        this.root = rootElement;
    }

    public use(pathname: string, page: new () => Block): Router {
        const route = new Route(pathname, page);
        this.routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            if (target.location.pathname === this.currentPath) {
                return;
            }
            this.currentPath = target.location.pathname;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public navigate(to: string): void {
        history.pushState(null, "", to);

        this._onRoute(to);
    }

    private _onRoute(pathname: string): void {
        const route = this.routes.find((route) => route.match(pathname));

        if (!route) {
            throw new Error("Не туда!");
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.off(this.root);
        }

        this.currentRoute = route;
        route.on(this.root);
    }
}

export default new Router("root");
