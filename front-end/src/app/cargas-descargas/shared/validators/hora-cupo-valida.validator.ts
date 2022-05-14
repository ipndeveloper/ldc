import { AbstractControl, ValidatorFn } from '@angular/forms';

export function horaCupoValida(): ValidatorFn {
    return (ctrlHoraCorteCupo: AbstractControl): {[key: string]: boolean} | null => {
        if (ctrlHoraCorteCupo && ctrlHoraCorteCupo.value ) {
            const hora = String(ctrlHoraCorteCupo.value).substring(0, 2);
            const minuto = String(ctrlHoraCorteCupo.value).substring(3, 5);
            const horaConFormato = Number(hora);
            const minutoConFormato = Number(minuto);
            if (hora.length !== 2 || minuto.length !== 2 || minutoConFormato > 59 || horaConFormato > 23) {
                return {'horaCupoValida': true};
            }
        }
        return null;
    };
}
