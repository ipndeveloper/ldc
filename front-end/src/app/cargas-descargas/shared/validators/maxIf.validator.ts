import { ValidatorFn, AbstractControl } from '@angular/forms';

export function maxIf(maxValue: number | null): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c &&
            maxValue !== null &&
            c.value !== null &&
            c.value !== undefined &&
            c.value !== '' &&
            c.value > maxValue) {
            return {'max': true};
        }
        return null;
    };
}
