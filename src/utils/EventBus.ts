class EventBus {
    private readonly listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

    public on(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        
        this.listeners[event].push(callback);
    }

    public off(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    public emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}

export default EventBus;
