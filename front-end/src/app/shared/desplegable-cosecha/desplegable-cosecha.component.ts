import { Component, Input, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CosechaService } from './cosecha.service';
import { Cosecha } from '../data-models/cosecha';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Producto } from '../data-models/producto';
import { of, Observable } from 'rxjs';
import { CampoEpaSustentable } from '../data-models/campo-epa-sustentable';
import { Terminal } from '../data-models/terminal';
import { ParametrosTerminalService } from '../../cargas-descargas/shared/services/parametros-terminal.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-desplegable-cosecha',
  templateUrl: './desplegable-cosecha.component.html',
  styleUrls: ['./desplegable-cosecha.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCosechaComponent }
  ]
})
export class DesplegableCosechaComponent extends DropdownComponent<Cosecha> implements OnInit, OnChanges  {

  cosechaService: CosechaService;
  @Input() cssClassControl = 'col-sm-9';
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() control: FormControl;
  @Input() producto: Producto;
  @Input() terminalActual: Terminal;
  @Input() campoEpaSustentable: CampoEpaSustentable;
  @Input() fillCampoEpa: boolean;
  @Input() etiqueta = 'Cosecha';
  @Input() debeCompletarCosechaPorDefecto = true;
  @ViewChild('selectCosecha') cosechaElement: ElementRef;

  constructor(cosechaService: CosechaService,
              private readonly parametrosTerminalService: ParametrosTerminalService) {
    super(cosechaService);

    this.cosechaService = cosechaService;
  }

  mapToProducto(objectToMap: Object): Producto {
    return objectToMap as Producto;
  }

  ngOnInit() {
    this.baseElement = this.cosechaElement;
  }

  ngOnChanges(): void {
    if (this.producto && (!this.fillCampoEpa || (this.fillCampoEpa && !this.campoEpaSustentable.cosecha))) {
      if (!this.writtenSelectedEntityId && this.selectedEntityId) {
        this.writtenSelectedEntityId = this.selectedEntityId;
      }
      this.getData().subscribe(entities => {
        const newEntities = this.map(entities);
        if (this.entities.length === 1 ||
            this.entities.length === 0 ||
            !this.objectsAreSame(this.entities, newEntities)) {
          this.entities = newEntities;
        }

        if (this.producto) {

          const idTerminal = this.terminalActual && this.terminalActual.id;
          this.parametrosTerminalService.getCosechaPorDefecto(this.producto.id, idTerminal)
          .subscribe((cosecha: EntityWithDescription) => {

            if (cosecha && this.debeCompletarCosechaPorDefecto) {
              this.SelectedEntity = this.entities.filter(e => e.id === cosecha.id)[0];
            } else {
              this.SelectedEntity = null as any;
              this.selectedEntityId = undefined;
            }

            const selectedEntity = this.entities.find(entity => entity.id !== undefined && entity.id === this.writtenSelectedEntityId);
            if (selectedEntity !== undefined) {
              this.SelectedEntity = selectedEntity;
            } else {
              this.writtenSelectedEntityId = this.selectedEntityId;
            }
          });
        }
      });
    } else if (this.campoEpaSustentable) {
      this.entities = [this.campoEpaSustentable.cosecha];
      this.SelectedEntity = this.campoEpaSustentable.cosecha;
    } else {
      this.clear();
    }
  }

  protected getData(): Observable<Cosecha[]> {
    if (this.producto && this.producto.id) {
      return this.cosechaService.getCosechasPorProducto(this.producto.id);
    } else {
      return of([]);
    }
  }
}
