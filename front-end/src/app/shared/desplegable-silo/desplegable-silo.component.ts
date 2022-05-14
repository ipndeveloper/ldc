import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Silo } from '../data-models/silo';
import { SiloService } from './desplegable-silo.service';
import { Producto } from '../data-models/producto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-silo',
  templateUrl: './desplegable-silo.component.html',
  styleUrls: ['./desplegable-silo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableSiloComponent }
  ]
})
export class DesplegableSiloComponent extends DropdownComponent<Silo> implements OnChanges, AfterViewInit {
  @ViewChild('selectSilo') select: ElementRef;
  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;
  @Input() producto: Producto;
  siloService: SiloService;

  constructor(siloService: SiloService) {
    super(siloService);
    this.siloService = siloService;
  }

  ngAfterViewInit() {
    this.baseElement = this.select;
  }

  ngOnChanges(): void {
    if (this.producto) {
      this.getData().subscribe(entities => {
        this.entities = this.map(entities);
        const selectedEntity = this.entities.find(entity => entity.id === this.writtenSelectedEntityId);
        if (selectedEntity !== undefined && this.control.value !== undefined) {
          this.SelectedEntity = selectedEntity;
        } else {
          if (this.opcionSeleccione) {
            this.selectedEntityId = undefined;
          } else {
            this.SelectedEntity = this.entities[0];
          }
        }
      });
    } else {
      this.clear();
    }
  }

  protected getData(): Observable<Silo[]> {
    if (this.producto) {
      return this.siloService.getSilosPorProducto(this.producto.id);
    } else {
      return of([]);
    }
  }
}
