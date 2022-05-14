import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RegistroDetalleSobreTransporteDataView } from '../../../../shared/data-models/sobre-transporte-data-view';
import { ITreeOptions } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'yrd-consulta-entidad-transportable',
  templateUrl: './consulta-entidad-transportable.component.html',
  styleUrls: ['./consulta-entidad-transportable.component.css']
})
export class ConsultaEntidadTransportableComponent implements AfterViewInit {

  MIN_HEIGHT = 40;
  MAX_HEIGHT = 250;
  PX_ROW = 26;

  @Input() titulo = 'Entidad Transportable';
  @Input() entidades: RegistroDetalleSobreTransporteDataView[] | null;
  @ViewChild('treeElementContainer') treeElementContainer: ElementRef;

  options: ITreeOptions = {
    useCheckbox: false,
    displayField: 'nombre',
    childrenField: 'hijos',
  };

  get height() {
    if (this.entidades) {
      const registros = this.mapEntidadesTransportables(this.entidades);
      return this.calcularHeight(registros.length);
    }
    return 'auto';
  }

  constructor() { }

  ngAfterViewInit() {
    this.options.scrollContainer = this.treeElementContainer.nativeElement as HTMLElement;
  }

  private mapEntidadesTransportables(registros: RegistroDetalleSobreTransporteDataView[]) {
    const registrosTotales: RegistroDetalleSobreTransporteDataView[] = [];

    registros.map((registro: RegistroDetalleSobreTransporteDataView) => this.mapHijos(registro, registrosTotales));

    return registrosTotales;
  }

  private mapHijos(registro: RegistroDetalleSobreTransporteDataView, registrosTotales: RegistroDetalleSobreTransporteDataView[]) {
    if (registro.hijos.length > 0) {
      registro.hijos.map((registroHijo: RegistroDetalleSobreTransporteDataView) => this.mapHijos(registroHijo, registrosTotales));
    } else {
      registrosTotales.push(registro);
    }
  }

  private calcularHeight(cantidadRegistros: number) {
    const pixeles = cantidadRegistros * this.PX_ROW;
    let height: number;
    if (pixeles < this.MIN_HEIGHT) {
      height = this.MIN_HEIGHT;
    } else if (pixeles > this.MAX_HEIGHT) {
      height = this.MAX_HEIGHT;
    } else {
      height = pixeles;
    }
    return height + 'px';
  }

}
