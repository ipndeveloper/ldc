import { ValidatorFn, AbstractControl } from '@angular/forms';

export function patenteCamionDistintaPatenteAcopladoValidator(): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {

        const patenteCamion = c.get('patenteCamion');
        const patenteAcoplado  = c.get('patenteAcoplado');

        if (patenteCamion && patenteAcoplado &&
            patenteCamion.value && patenteAcoplado.value) {
            if (patenteCamion.value === patenteAcoplado.value) {
                patenteCamion.setErrors({ 'patenteCamionDistintaPatenteAcoplado': true });
                patenteAcoplado.setErrors({ 'patenteCamionDistintaPatenteAcoplado': true });
                return { 'patenteCamionDistintaPatenteAcoplado': true };
            }
            if (patenteCamion.errors) {
                patenteCamion.errors['patenteCamionDistintaPatenteAcoplado'] = null;
                patenteCamion.updateValueAndValidity({ onlySelf: true });
            }

            if (patenteAcoplado.errors) {
                patenteAcoplado.errors['patenteCamionDistintaPatenteAcoplado'] = null;
                patenteAcoplado.updateValueAndValidity({ onlySelf: true });
            }
        }
        return null;
    };
}
