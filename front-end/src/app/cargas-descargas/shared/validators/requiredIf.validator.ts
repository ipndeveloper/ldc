import { ValidatorFn, AbstractControl } from '@angular/forms';

export function requiredIf(isRequired: boolean): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c) {
            if (isRequired && !c.value) {
                return {'required': true};
            }
            return null;
        }
        return null;
    };
}
