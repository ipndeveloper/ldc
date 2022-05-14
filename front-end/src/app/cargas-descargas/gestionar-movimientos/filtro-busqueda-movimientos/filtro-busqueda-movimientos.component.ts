import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from '../../../core/models/dictionary';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { DesplegableTipoDocumentoPorteComponent } from '../../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';

@Component({
  selector: 'yrd-filtro-busqueda-movimientos',
  templateUrl: './filtro-busqueda-movimientos.component.html',
  styleUrls: ['./filtro-busqueda-movimientos.component.css'],
  providers: [FormComponentService]
})
export class FiltroBusquedaMovimientosComponent implements AfterViewInit {
  @Input() filtrosForm: FormGroup;
  @Input() filters: Dictionary<string>;
  @ViewChild('tipoDocPorte') tipoDocPorte: DesplegableTipoDocumentoPorteComponent;

  constructor() { }

  ngAfterViewInit(): void {
    this.tipoDocPorte.setFocus();
  }
}
