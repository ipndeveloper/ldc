import { ValidatorFn, AbstractControl } from '@angular/forms';

export function searchValidator(): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {

        if (c && c.value && !c.value.id && !c.value.validSearch) {
            return {searchValueNotValid: true};
        }

        return null;
    };
}
