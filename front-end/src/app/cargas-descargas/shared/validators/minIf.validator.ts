import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minIf(minValue: number | null): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c &&
            minValue !== null &&
            c.value !== null &&
            c.value !== undefined &&
            c.value !== '' &&
            c.value < minValue) {
            return {'min': true};
        }
        return null;
    };
}
