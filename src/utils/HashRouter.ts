import Block from "./Block";
import { Route } from "./Router";

class HashRouter {
    private routes: Route[] = [];
    private currentRoute: Route | null  = null;
    private root: HTMLElement;

    constructor(root: string) {
        const rootElement = document.getElementById(root);
        if (!rootElement) {
            throw new Error("Не найден root элемент");
        }
        this.root = rootElement;
    }

    public use(pathname: string, page: new () => Block): HashRouter {
        const route = new Route(pathname, page);
        this.routes.push(route);

        return this;
    }

    public start(): void {
        window.onhashchange = (event: HashChangeEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.hash);
        };

        this._onRoute(window.location.hash);
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

export default HashRouter;
