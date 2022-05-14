import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTipoDocumentoPorteComponent } from '../../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';

@Component({
  selector: 'yrd-filtro-gestionar-cupos',
  templateUrl: './filtro-gestionar-cupos.component.html',
  styleUrls: ['./filtro-gestionar-cupos.component.css']
})

export class FiltroGestionarCuposComponent {

  @Input() filtrosForm: FormGroup;
  @Input() filtroEstadoMovimiento: DesplegableEstadoMovimientoFilter;
  @ViewChild('tipoDocPorte') tipoDocPorte: DesplegableTipoDocumentoPorteComponent;

  constructor() { }

  setFocus(): void {
    this.tipoDocPorte.setFocus();
  }
}

