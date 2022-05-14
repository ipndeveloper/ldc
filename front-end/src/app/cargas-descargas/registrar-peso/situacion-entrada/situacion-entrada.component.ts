import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientoPesaje } from '../movimiento-pesaje';
import { ResultadosPesaje } from '../../../shared/enums/enums';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-situacion-entrada',
  templateUrl: './situacion-entrada.component.html',
  styleUrls: ['./situacion-entrada.component.css']
})
export class SituacionEntradaComponent implements OnInit {
  @Input() situacionEntradaForm: FormGroup;
  @Input() movimientoPesaje: MovimientoPesaje;
  @Input() esDescarga = true;
  @Input() idCircuito: number;

  valorDescargoCargo = ResultadosPesaje.Exito;
  valorNoDescargoCargo = ResultadosPesaje.Error;

  get textoDescargaCarga(): string {
    return this.esDescarga ? Resources.Labels.Descarga : Resources.Labels.Carga;
  }

  constructor() { }

  ngOnInit() {
  }

}
