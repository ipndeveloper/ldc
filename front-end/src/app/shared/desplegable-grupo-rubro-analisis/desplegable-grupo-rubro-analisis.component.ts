import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GrupoRubroCalidadAnalisis } from '../data-models/grupo-rubro-calidad-analisis';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { GrupoRubroAnalisisService } from './grupo-rubro-analisis.service';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Producto } from '../data-models/producto';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { Terminal } from '../data-models/terminal';

@Component({
  selector: 'yrd-desplegable-grupo-rubro-analisis',
  templateUrl: './desplegable-grupo-rubro-analisis.component.html',
  styleUrls: ['./desplegable-grupo-rubro-analisis.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableGrupoRubroAnalisisComponent }
  ]
})
export class DesplegableGrupoRubroAnalisisComponent extends DropdownComponent<GrupoRubroCalidadAnalisis> implements AfterViewInit {

  private readonly grupoRubroAnalisisService: GrupoRubroAnalisisService;
  @ViewChild('selectGrupoRubroAnalisis') selectGrupoRubroAnalisis: ElementRef;
  @Input() requiereAnalisisCamara: boolean;
  @Input() control: FormControl;
  private _producto: Producto;
  private _terminal: Terminal;
  @Input()
  set producto(val: Producto) {
    this._producto = val;
    this.databind();
  }
  @Input()
  set terminal(val: Terminal) {
    this._terminal = val;
    this.databind();
  }
  @Input() entidadSeleccionada?: GrupoRubroCalidadAnalisis;

  ngAfterViewInit(): void {
    this.baseElement = this.selectGrupoRubroAnalisis;
  }

  constructor(grupoRubroAnalisisService: GrupoRubroAnalisisService,
    dropdownNotificationService:  DropdownNotificationService<GrupoRubroCalidadAnalisis>) {
    super(grupoRubroAnalisisService, dropdownNotificationService);
    this.grupoRubroAnalisisService = grupoRubroAnalisisService;
  }

  protected databind(): void {
    this.getData()
      .subscribe(entities => {
        this.entities = this.map(entities);
        if (this.requiereAnalisisCamara && this._producto && this._producto.grupoRubroAnalisisPorDefecto) {
          this.SelectedEntity = this._producto.grupoRubroAnalisisPorDefecto;
        }
        if (this.entidadSeleccionada && this.entidadSeleccionada.id) {
          this.SelectedEntity = this.entidadSeleccionada;
        }
        if (this.notificationService) {
          this.notificationService.onDropdownFilled();
        }
      });
  }

  protected getData(): Observable<GrupoRubroCalidadAnalisis[]> {
    if (this._producto) {
      if (this._terminal) {
        return this.grupoRubroAnalisisService.getGruposRubroAnalisisPorProducto(this._producto.id, this._terminal.id);
      }
      return this.grupoRubroAnalisisService.getGruposRubroAnalisisPorProducto(this._producto.id);
    } else {
      return of([]);
    }
  }
}
