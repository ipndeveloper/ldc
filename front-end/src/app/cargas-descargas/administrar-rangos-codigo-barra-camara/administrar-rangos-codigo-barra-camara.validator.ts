import { ValidatorFn, AbstractControl } from '@angular/forms';

export function numberLessThan(firstAccessor: string, secondAccessor: string): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c) {
            const firstControl = c.get(firstAccessor);
            const secondControl = c.get(secondAccessor);
            if (firstControl && secondControl && firstControl.value && secondControl.value) {
                if (+firstControl.value < +secondControl.value) {
                    if (firstControl.errors) {
                        firstControl.errors['numberLessThan'] = null;
                        firstControl.updateValueAndValidity({ onlySelf: true });
                    }
                    if (secondControl.errors) {
                        secondControl.errors['numberLessThan'] = null;
                        secondControl.updateValueAndValidity({ onlySelf: true });
                    }
                } else {
                    firstControl.setErrors({ 'numberLessThan': true });
                    secondControl.setErrors({ 'numberLessThan': true });
                    return { 'numberLessThan': true };
                }
            }
        }
        return null;
    };
}

export function dateLessThan(firstAccessor: string, secondAccessor: string): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c) {
            const firstControl = c.get(firstAccessor);
            const secondControl = c.get(secondAccessor);
            if (firstControl && secondControl && firstControl.value && secondControl.value) {
                if (new Date(firstControl.value) < new Date(secondControl.value)) {
                    if (firstControl.errors) {
                        firstControl.errors['dateLessThan'] = null;
                        firstControl.updateValueAndValidity({ onlySelf: true });
                    }
                    if (secondControl.errors) {
                        secondControl.errors['dateLessThan'] = null;
                        secondControl.updateValueAndValidity({ onlySelf: true });
                    }
                } else {
                    firstControl.setErrors({ 'dateLessThan': true });
                    secondControl.setErrors({ 'dateLessThan': true });
                    return { 'dateLessThan': true };
                }
            }
        }
        return null;
    };
}
