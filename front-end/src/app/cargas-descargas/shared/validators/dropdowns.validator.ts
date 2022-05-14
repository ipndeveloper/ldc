import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ReferenciaDestino } from '../../../shared/data-models/referencia-destino';

export function referenciaDestinoRequeridoSegunActividadValidator(accionControl: AbstractControl,
accionIdsRequired: number[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const referenciaDestino = c.value as ReferenciaDestino;
        if (accionControl && accionControl.value) {
            if (!referenciaDestino &&
                accionIdsRequired.some(a => a === accionControl.value.accion)) {
                return { 'required': true };
            }
        }
        return null;
    };
}
