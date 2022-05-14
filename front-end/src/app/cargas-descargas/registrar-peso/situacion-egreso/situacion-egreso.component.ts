import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientoPesaje } from '../movimiento-pesaje';
import { ResultadosPesaje } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-situacion-egreso',
  templateUrl: './situacion-egreso.component.html',
  styleUrls: ['./situacion-egreso.component.css']
})
export class SituacionEgresoComponent implements OnInit {
  @Input() situacionSalidaForm: FormGroup;
  @Input() movimientoPesaje: MovimientoPesaje;
  @Input() esDescarga = true;
  @Input() idCircuito: number;
  valorDescargoCargo = ResultadosPesaje.Exito;
  valorNoDescargoCargo = ResultadosPesaje.Error;
  valorCargoConError = ResultadosPesaje.CargoConError;

  get textoDescargaCarga(): string {
    return this.esDescarga ? 'Descargó' : 'Cargó';
  }

  constructor() { }

  ngOnInit() {
  }

}
