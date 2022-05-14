import { AbstractControl } from '@angular/forms';

// /// =======================================================
// /// Validacion de la fecha de Lote
// /// =======================================================
export function validateFechaVtoLote(control: AbstractControl) {

    let error = true;

    // Fecha de ahora
    const ahora = new Date(Date.now());

    // Fecha limite tolerable (Hoy - 15 dias)
    // const fechaLimite = new Date(ahora.setDate(ahora.getDate() + 15));

    // Fecha ingresada por el usuario
    const fechaControl = new Date(control.value);

    // Controla que la fecha ingresada este dentro del rango esperado
    error = !(fechaControl > ahora);

    const message = {
        'fechaVtoLoteInvalida': true
    };

    return error ? message : null;
}

// /// =======================================================
// /// Validacion para que la tara no sea mayor al bruto
// /// =======================================================
export function kgsBrutosGreaterThanKgsTara(c: AbstractControl) {
    const bruto = c.get('kilosBruto');
    const tara  = c.get('kilosTara');

    if (bruto && tara && (!bruto.pristine || bruto.value) && (!tara.pristine || tara.value)) {
      if (+bruto.value > +tara.value) {
        if (bruto.errors) {
          bruto.errors['kgBrutoGreaterThanKgTara'] = null;
          bruto.updateValueAndValidity({ onlySelf: true });
        }
        if (tara.errors) {
          tara.errors['kgBrutoGreaterThanKgTara'] = null;
          tara.updateValueAndValidity({ onlySelf: true });
        }
      } else {
        bruto.setErrors({ 'kgBrutoGreaterThanKgTara': true });
        tara.setErrors({ 'kgBrutoGreaterThanKgTara': true });
      }
    }
  }
