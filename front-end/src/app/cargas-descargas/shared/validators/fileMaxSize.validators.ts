import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Archivo } from '../../../shared/data-models/archivo';

export function fileMaxSizeValidator(maxBytes: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c) {
            const archivos = c.value as Archivo[];
            if (archivos && archivos.length && archivos.some((archivo: Archivo) => archivo.peso > maxBytes)) {
                return { 'fileMaxSizeExceeded': true };
            }
        }
        return null;
    };
}
