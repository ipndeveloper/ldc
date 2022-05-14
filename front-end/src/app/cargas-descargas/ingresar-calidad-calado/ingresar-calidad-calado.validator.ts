import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { AccionesCalidad } from '../../shared/enums/enums';

export function codigoDeBarraRequeridoSegunAccionYCamara(accionControl: FormGroup,
    datosCamaraControl: FormGroup): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c && accionControl && datosCamaraControl) {
                if (!c.value &&
                    accionControl.controls.accion.value !== AccionesCalidad.Rechazar &&
                    (datosCamaraControl.controls.camara.value || datosCamaraControl.controls.tecnologia.value)) {
                    return { 'required': true };
                }
            }
            return null;
        };
    }

export function requeridoSiCheckCamaraTildado(datosCamaraControl: FormGroup): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c && datosCamaraControl) {
                if (!c.value &&
                    datosCamaraControl.controls.camara.value) {
                    return { 'required': true };
                }
            }
            return null;
        };
    }
