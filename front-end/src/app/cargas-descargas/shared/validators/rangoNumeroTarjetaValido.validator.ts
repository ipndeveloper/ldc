import { ValidatorFn, AbstractControl } from '@angular/forms';

export function rangoNumeroTarjetaValido(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const desde = c.get('desde.numeroTarjeta');
        const hasta  = c.get('hasta.numeroTarjeta');

        if (desde && hasta &&
            desde.value && hasta.value) {
            if (desde.value >= hasta.value) {
                hasta.setErrors({ 'rangoIngresadoIncorrecto': true });
                return { 'rangoIngresadoIncorrecto': true };
            }
            if (hasta.errors) {
                hasta.errors['rangoIngresadoIncorrecto'] = null;
                hasta.updateValueAndValidity({ onlySelf: true });
            }
        }
        return null;
    };
}
