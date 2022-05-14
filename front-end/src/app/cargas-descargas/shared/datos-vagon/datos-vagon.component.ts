import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

@Component({
  selector: 'yrd-datos-vagon',
  templateUrl: './datos-vagon.component.html',
  styleUrls: ['./datos-vagon.component.css']
})
export class DatosVagonComponent implements OnInit {

  @Input() datosVagonForm: FormGroup;
  @Input() esFueraCircuito = false;
  @ViewChild('numeroVagon') numeroVagon: NumeroConEtiquetaComponent;

  validationMessagesKilosBrutos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosBruto),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, '0'),
    pattern: 'Se deben ingresar números enteros.',
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, Resources.Labels.KilosTara),
    max: 'El Campo Kilos Bruto debe ser menor a 2,147,483,647'
  };

  validationMessagesKilosTara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosTara),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosTara, '0'),
    pattern: 'Se deben ingresar números enteros.',
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.KilosTara, Resources.Labels.KilosBruto),
    max: 'El Campo Kilos Tara debe ser menor a 2,147,483,647'
  };

  validationMessagesVagon = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vagon),
    max: 'El número ingresado excede la longitud máxima',
    min: 'El número ingresado no cumple con la longitud mínima'
  };

  constructor() { }

  ngOnInit() {
    this.createSubscriptions();
  }


  createSubscriptions() {
    this.subscribeKilosTara();
    this.subscribeKilosBruto();
  }

  private subscribeKilosTara(): void {
    const kilosTara = this.datosVagonForm.get('kilosBrutosTaraGroup.kilosTara');
    if (kilosTara) {
      kilosTara.setValue('');
      kilosTara.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  setFocusVagon() {
    this.numeroVagon.setFocus();
  }

  private subscribeKilosBruto(): void {
    const kilosBruto = this.datosVagonForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosBruto) {
      kilosBruto.setValue('');
      kilosBruto.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
    }
  }

  private calcularkilosNeto(): void {
    const kilosTara = this.datosVagonForm.get('kilosBrutosTaraGroup.kilosTara');
    const kilosBruto = this.datosVagonForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosTara && kilosBruto &&
        kilosTara.value != null && kilosTara.value !== undefined &&
        kilosBruto.value != null && kilosBruto.value !== undefined) {
        this.datosVagonForm.patchValue({kilosNeto: +kilosBruto.value - +kilosTara.value});
    }
  }


}
