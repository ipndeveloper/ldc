import { Subscription, Observable } from 'rxjs';
import { readName } from './operators/name';
import { environment } from '../../../environments/environment';

const subscribers: SubscriptionSource[] = [];
const subscribersTotal: Subscription[] = [];

export class SubscriptionSource {
    constructor(public name: string, public subscription: Subscription) { }
}

export function setupSubscriptions() {
    const origSubscribe = Observable.prototype.subscribe;

    function subscribe<T>(this: Observable<T>, ...args: any[]): Subscription {
        const subscription = origSubscribe.apply(this, args);

        if (!environment.production) {
            subscribersTotal.push(subscription);
        }

        const nameObservable = readName(this);
        if (nameObservable) {

            const previousSubscriptionSourceIndex = subscribers.findIndex(ss => ss.name === nameObservable);
            if (previousSubscriptionSourceIndex !== -1) {
                subscribers[previousSubscriptionSourceIndex].subscription.unsubscribe();
                subscribers[previousSubscriptionSourceIndex].subscription = null as any;
                subscribers.splice(previousSubscriptionSourceIndex, 1);
            }

            const currentSubscriptionSource = new SubscriptionSource(nameObservable, subscription);
            subscribers.push(currentSubscriptionSource);
        }

        return subscription;
    }

    Observable.prototype.subscribe = subscribe;
}

function printAllSubscribers() {
    console.log('All subscribers:', subscribersTotal.length);
}

function printNamedSubscribers() {
    console.log('Named subscribers:', subscribers.length);
}

if (!environment.production) {
    window['subscribers'] = subscribers;
    window['printAllSubscribers'] = printAllSubscribers;
    window['printNamedSubscribers'] = printNamedSubscribers;
}
