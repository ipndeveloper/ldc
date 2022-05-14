import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'yrd-confirmacion-arribo-ctg',
  templateUrl: './confirmacion-arribo-ctg.component.html',
  styleUrls: ['./confirmacion-arribo-ctg.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ConfirmacionArriboCtgComponent }
  ]
})
export class ConfirmacionArriboCtgComponent implements OnChanges {

  @Input() confirmacionArriboCtgForm: FormGroup;
  @Input() esPreIngreso = false;
  @Input() maximo = 8;
  @Input() esCartaPorteElectronica = false;
  @Input() tieneCaracteristicaDeCTG = false;
  @Input() confirmoCtg = false;


  validationMessagesCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CTG),
    pattern: Resources.Messages.ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero.format(this.maximo.toString())
  };

  validationMessagesCodCancelacionCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodCancelacionCTG),
  };

  validationMessagesPesoNetoKg = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PesoNeto)
  };

  validationMessagesTransportista = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Transportista),
  };

  validationMessagesKilosNeto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PesoNeto),
    pattern: 'Se deben ingresar números enteros.',
    max: 'El Campo Kilos Neto debe ser menor a 2,147,483,647',
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.PesoNeto, '0')
  };

  validationMessagesChofer = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Chofer),
    choferInhabilitado: Resources.Messages.ElChoferSeEncuentraInhabilitadoParaElIngreso,
    choferPenalizado: Resources.Messages.ElChoferSeEncuentraPenalizadoParaElIngreso,
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  constructor() { }

  ngOnChanges() {
    this.suscribirCambios();
  }
  private suscribirCambios(): void {
    const aceptarSinConfirmarCtg = this.confirmacionArriboCtgForm.get('aceptarSinConfirmarCtg');
    const codigoCancelacionCtg = this.confirmacionArriboCtgForm.get('codigoCancelacionCtg');
    this.maximo = this.esCartaPorteElectronica ? 12 : 8;

    if (aceptarSinConfirmarCtg && codigoCancelacionCtg && !this.esCartaPorteElectronica) {
      aceptarSinConfirmarCtg.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value: boolean) => {
          if (value) {
            codigoCancelacionCtg.reset();
            codigoCancelacionCtg.disable();
            codigoCancelacionCtg.updateValueAndValidity();
          } else if (value === false) {
            if (this.tieneCaracteristicaDeCTG) {
              if (!this.esCartaPorteElectronica) {
                codigoCancelacionCtg.enable();
              }

              codigoCancelacionCtg.updateValueAndValidity();
            }
          }
        });
    }
  }
}
