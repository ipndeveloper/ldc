import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Producto } from '../data-models/producto';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../buscador-producto/producto.service';

@Component({
  selector: 'yrd-desplegable-producto-por-grupo',
  templateUrl: './desplegable-producto-por-grupo.component.html',
  styleUrls: ['./desplegable-producto-por-grupo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableProductoPorGrupoComponent }
  ]
})
export class DesplegableProductoPorGrupoComponent extends DropdownComponent<Producto> implements OnChanges {
  @Input() control: FormControl;
  @Input() producto: Producto;
  private idGrupoAnterior: number;
  productoService: ProductoService;
  @ViewChild('selectProducto') selectProducto: ElementRef;

  constructor(productoService: ProductoService) {
    super(productoService);
    this.productoService = productoService;
  }

  ngOnChanges(): void {
    if (this.producto) {
      if (this.idGrupoAnterior !== this.producto.idGrupo) {
        this.idGrupoAnterior = this.producto.idGrupo;
        this.writtenSelectedEntityId = this.producto.id;
        if (this.producto.idGrupo) {
          this.getData().subscribe(entities => {
            this.entities = this.map(entities);
            const selectedEntity = this.entities.find(entity => entity.id === this.writtenSelectedEntityId);
            if (selectedEntity !== undefined) {
              this.SelectedEntity = selectedEntity;
            } else {
              this.SelectedEntity = this.entities[0];
            }
          });
        } else {
          this.entities = [this.producto];
          this.SelectedEntity = this.producto;
        }
      }
    } else {
      this.clear();
    }
  }

  setFocus() {
    this.selectProducto.nativeElement.focus();
  }

  protected getData(): Observable<Producto[]> {
    if (this.producto) {
      return this.productoService.getProductosPorGrupo(this.producto.idGrupo);
    } else {
      return of([]);
    }
  }
}
