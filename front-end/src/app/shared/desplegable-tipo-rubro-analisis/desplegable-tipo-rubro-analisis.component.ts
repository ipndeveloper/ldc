import { Component, AfterViewInit, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { GrupoRubroCalidadAnalisis } from '../data-models/grupo-rubro-calidad-analisis';
import { GrupoRubroAnalisisService } from '../desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Producto } from '../data-models/producto';
import { Terminal } from '../data-models/terminal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-tipo-rubro-analisis',
  templateUrl: './desplegable-tipo-rubro-analisis.component.html',
  styleUrls: ['./desplegable-tipo-rubro-analisis.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoRubroAnalisisComponent }
  ]
})
export class DesplegableTipoRubroAnalisisComponent
                                        extends DropdownComponent<GrupoRubroCalidadAnalisis> implements AfterViewInit, OnChanges {

  @ViewChild('selectGrupoRubroAnalisis') selectGrupoRubroAnalisis: ElementRef;
  @Input() requiereAnalisisCamara: boolean;
  @Input() control: FormControl;
  @Input() producto: Producto;
  @Input() terminal: Terminal;
  grupoRubroAnalisisService: GrupoRubroAnalisisService;
  ngAfterViewInit(): void {
    this.baseElement = this.selectGrupoRubroAnalisis;
  }

  constructor(grupoRubroAnalisisService: GrupoRubroAnalisisService) {
    super(grupoRubroAnalisisService);
    this.grupoRubroAnalisisService = grupoRubroAnalisisService;
  }

  ngOnChanges(): void {
    this.databind();
  }


  protected getData(): Observable<GrupoRubroCalidadAnalisis[]> {
    if (this.producto) {
      if (this.terminal) {
        return this.grupoRubroAnalisisService.getGruposRubroAnalisisPorProducto(this.producto.id, this.terminal.id);
      }
      return this.grupoRubroAnalisisService.getGruposRubroAnalisisPorProducto(this.producto.id);
    } else {
      return of([]);
    }
  }
}
