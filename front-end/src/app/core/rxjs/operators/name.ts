import { Observable, Operator, Subscriber } from 'rxjs';

class NameOperator<T> implements Operator<T, T> {
    constructor(readonly observableName: string) { }

    call(subscriber: Subscriber<T>, source: any): any {
        return source.subscribe(subscriber);
    }
}

export function name<T>(observableName: string): (source: Observable<T>) => Observable<T> {
    return function nameOperation(source: Observable<T>): Observable<T> {
        return source.lift(new NameOperator(observableName));
    };
}

export function readName<T>(observable: Observable<T>): string | undefined {
    const operator = observable['operator'];
    if (!operator) {
        return undefined;
    }

    const observableName = operator['observableName'];
    if (!observableName) {
        return undefined;
    }

    return observableName;
}
