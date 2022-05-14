import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fechaDebeSerMenorIgualAFechaDelDia(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c && c.value) {
            const fecha = (new Date(c.value + 'T00:00:00')).valueOf();
            const fechaHoy = new Date().valueOf();
            if (fecha > fechaHoy) {
                return { 'fechaDebeSerMenorIgualAFechaDelDia': true };
            }
        }
        return null;
    };
}
