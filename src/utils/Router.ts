import Block from "./Block";


class Route {
    private page: Block | null = null;
    private pathname: string;
    private pageType: any;

    constructor(pathname: string, pageType: any) {
        this.pathname = pathname;
        this.pageType = pageType;
    }

    public on(element: HTMLElement): void {
        if (!this.page) {
            this.page = new this.pageType;
        }
        
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        element.appendChild(this.page?.getContent()!);
    }

    public off(element: HTMLElement): void {
        element.innerHTML = "";
    }

    public match(pathname: string): boolean {
        return this.pathname === pathname;
    }
}

class Router {
    private routes: Route[] = [];
    private currentRoute: Route | null  = null;
    private root: HTMLElement;

    constructor(rootElement: HTMLElement) {
        this.root = rootElement;
    }

    public use(pathname: string, page: any): Router {
        const route = new Route(pathname, page);
        this.routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
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

export default Router;
