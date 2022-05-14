export interface IKeyedCollection<T> {
    add(key: string, value: T);
    containsKey(key: string): boolean;
    count(): number;
    item(key: string): T;
    keys(): string[];
    remove(key: string): T;
    values(): T[];
}

export class Dictionary<T> implements IKeyedCollection<T> {

    private get _keys(): string[] {
        return Object.keys(this);
    }
    private get _values(): T[] {
        const values: T[] = [];
        this._keys.forEach((key: string) => {
            values.push(this[key]);
        });
        return values;
    }

    constructor() {
    }

    public count(): number {
        return this._keys.length;
    }

    public add(key: string, value: T) {
        this[key] = value;
    }

    public remove(key: string): T {
        const value = this[key];
        delete this[key];

        return value;
    }

    public keys(): string[] {
        return this._keys;
    }

    public values(): T[] {
        return this._values;
    }

    public containsKey(key: string) {
        return this.hasOwnProperty(key);
    }

    public item(key: string): T {
        return this[key];
    }

    public queryfy(): string {
        let query = '';
        this.keys().forEach(key => {
            if (this[key]) {
                query += `${key}=${this[key]}&`;
            }
        });
        return query;
    }

    public any(): boolean {
        return this.values().some(v => !!v);
    }
}
