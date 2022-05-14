import { ValidatorFn, AbstractControl } from '@angular/forms';
import { EntityWithCode } from '../../../core/models/entity-with-code';
import { Chofer } from '../../../shared/data-models/chofer';

export function buscadorPatternValidator(pattern: RegExp): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined) {
            const entityWithCode = c.value as EntityWithCode;
            if (entityWithCode && entityWithCode.codigo &&
                !pattern.test(entityWithCode.codigo)) {
                return {'buscadorPattern': true};
            }
            return null;
        }
        return null;
    };
}

export function choferInhabilitadoValidator(): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined) {
            const chofer = c.value as Chofer;
            if (chofer) {
                let errors: any = null;
                if (chofer.penalizado) {
                    if (!errors) {
                        errors = {};
                    }
                    errors['choferPenalizado'] = true;
                }
                if (!chofer.estaHabilitado) {
                    if (!errors) {
                        errors = {};
                    }
                    errors['choferInhabilitado'] = true;
                }
                return errors;
            }
            return null;
        }
        return null;
    };
}
