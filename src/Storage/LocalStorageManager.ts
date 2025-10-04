/**
 * Generic LocalStorage manager class for type-safe storage operations
 */
export class LocalStorageManager<T> {
    private key: string;
    private defaultValue: T;

    constructor(key: string, defaultValue: T) {
        this.key = key;
        this.defaultValue = defaultValue;
    }

    /**
     * Get value from localStorage with fallback to default
     */
    get(): T {
        try {
            const stored = window.localStorage.getItem(this.key);
            if (stored) {
                return JSON.parse(stored) as T;
            }
            return this.defaultValue;
        } catch (error) {
            console.warn(`Failed to get ${this.key} from localStorage:`, error);
            return this.defaultValue;
        }
    }

    /**
     * Set value to localStorage
     */
    set(value: T): void {
        try {
            window.localStorage.setItem(this.key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Failed to set ${this.key} to localStorage:`, error);
        }
    }

    /**
     * Remove value from localStorage
     */
    remove(): void {
        try {
            window.localStorage.removeItem(this.key);
        } catch (error) {
            console.warn(`Failed to remove ${this.key} from localStorage:`, error);
        }
    }

    /**
     * Check if value exists in localStorage
     */
    exists(): boolean {
        try {
            return window.localStorage.getItem(this.key) !== null;
        } catch (error) {
            return false;
        }
    }

    /**
     * Update value using a function
     */
    update(updateFn: (current: T) => T): void {
        const current = this.get();
        const updated = updateFn(current);
        this.set(updated);
    }
}
