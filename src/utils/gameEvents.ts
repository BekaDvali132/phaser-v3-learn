type EventCallback = (...args: any[]) => void;

class GameEventEmitter {
    private events: Map<string, EventCallback[]> = new Map();

    on(event: string, callback: EventCallback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    off(event: string, callback: EventCallback) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emit(event: string, ...args: any[]) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
    }

    removeAllListeners() {
        this.events.clear();
    }
}

export const gameEvents = new GameEventEmitter();

(window as unknown as { gameEvents: GameEventEmitter }).gameEvents = gameEvents;

// dropBalls(1000, 1)
(window as unknown as { dropBalls: (count: number, delayMs?: number) => number }).dropBalls = (count: number, delayMs: number = 100) => {
    let dropped = 0;
    const interval = setInterval(() => {
        if (dropped >= count) {
            clearInterval(interval);
            console.log(`Finished dropping ${count} balls`);
            return;
        }
        gameEvents.emit('dropBall');
        dropped++;
    }, delayMs);
    return interval;
};