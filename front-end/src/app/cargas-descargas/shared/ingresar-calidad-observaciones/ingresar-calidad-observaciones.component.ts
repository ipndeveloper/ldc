import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-ingresar-calidad-observaciones',
  templateUrl: './ingresar-calidad-observaciones.component.html',
  styleUrls: ['./ingresar-calidad-observaciones.component.css']
})
export class IngresarCalidadObservacionesComponent implements OnInit {

  @Input() observacionesForm: FormGroup;
  @Input() esCalidadAnterior: boolean;
  @Input() esFueraDeCircuito: false;

  validationMessagesReferenciaDestino = {
    required: Resources.Messages.DebeIngresarUnaReferenciaDestinoParaLaDescarga
  };

  constructor() { }

  ngOnInit() {
  }

}
