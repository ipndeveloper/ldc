import { Component, ViewChild, ElementRef, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableRubroCalidadService } from './desplegable-rubro-calidad.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Producto } from '../data-models/producto';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-rubro-calidad',
  templateUrl: './desplegable-rubro-calidad.component.html',
  styleUrls: ['./desplegable-rubro-calidad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableRubroCalidadComponent }
  ]
})
export class DesplegableRubroCalidadComponent extends DropdownComponent<EntityWithDescription> implements OnChanges, AfterViewInit {

  @ViewChild('selectRubroCalidad') select: ElementRef;
  @Input() producto: Producto;

  constructor(protected service: DesplegableRubroCalidadService) {
    super(service);
   }

  setFocus() {
    setTimeout(() => {
      this.select.nativeElement.focus();
    }, 0);
  }

  ngAfterViewInit() {
    this.baseElement = this.select;
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (this.producto) {
      this.databind();
    } else {
      this.clear();
    }
  }

  protected getData(): Observable<EntityWithDescription[]> {
    if (this.producto) {
      return this.service.getRubrosPorProducto(this.producto.id);
    } else {
      return this.entityService.getAll();
    }
  }
}
