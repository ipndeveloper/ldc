import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ParametrosAccion } from '../../../shared/data-models/parametros-accion';
import { EventoActivoDataView } from '../../../shared/evento-activo-data-view';
import { ModalResolverEventoAutorizacionesComponent } from '../../dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-autorizaciones/modal-resolver-evento-autorizaciones.component';
import { ModalResolverEventoplataformaRequeridaComponent } from '../../dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-plataforma-requerida/modal-resolver-evento-plataforma-requerida.component';
import { ModalResolverEventoTarjetaMatriculaComponent } from '../../dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-tarjeta-matricula/modal-resolver-evento-tarjeta-matricula.component';
import { ModalResolverPlataformaDescargaComponent } from '../../dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-plataforma-descarga/modal-resolver-plataforma-descarga.component';
import { ModalSeleccionarBalanzaSalidaComponent } from '../../dashboard-balanzas-automatizadas/detalle-balanza/modal-seleccionar-balanza-salida/modal-seleccionar-balanza-salida.component';
import { ModalAutorizacionComponent } from '../../shared/modals/modal-autorizacion/modal-autorizacion.component';

@Component({
  selector: 'yrd-detalle-eventos-pendientes',
  templateUrl: './detalle-eventos-pendientes.component.html',
  styleUrls: ['./detalle-eventos-pendientes.component.css']
})
export class DetalleEventosPendientesComponent implements OnInit {
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('modalResolverPlataformaRequerida') ModalResolverPlataformaRequerida: ModalResolverEventoplataformaRequeridaComponent;
  @ViewChild('modalResolverTarjetaMatricula') ModalResolverTarjetaMatricula: ModalResolverEventoTarjetaMatriculaComponent;
  @ViewChild('modalSeleccionarBalanzaSalida') ModalSeleccionarBalanzaSalida: ModalSeleccionarBalanzaSalidaComponent;
  @ViewChild('modalResolverAutorizaciones') ModalResolverAutorizaciones: ModalResolverEventoAutorizacionesComponent;
  @ViewChild('modalResolverPlataformaDescarga') ModalResolverPlataformaDescarga: ModalResolverPlataformaDescargaComponent;
  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;

  @Input() form: FormGroup;

  get eventosActivosFormArray() {
    return this.form.controls.eventosActivos as FormArray;
  }

  columns: any;
  rows: any;
  selectedRows: any = [];

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.setGridColumns();
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.tableCellTemplate,
        width: 30,
      },
      {
        name: 'Balanza',
        prop: 'value.balanza',
        width: 5,
      },
      {
        name: 'Sentido',
        prop: 'value.sentido',
        width: 5
      },
      {
        name: 'Estado de Balanza',
        prop: 'value.estadoBalanza',
        width: 5
      },
      {
        name: 'Aviso',
        prop: 'value.aviso',
        width: 60
      },
      {
        name: 'Fecha/Hora',
        prop: 'value.fechaHora',
        width: 5,
      }
    ];
  }

  onSelect(rows: any) {
    this.selectedRows = rows.selected;
  }

  setEventosActivos(eventosActivos: EventoActivoDataView[]) {
    while (this.eventosActivosFormArray.length !== 0) {
      this.eventosActivosFormArray.removeAt(0);
    }
    eventosActivos.forEach((eventoActivo: EventoActivoDataView) => {
      this.eventosActivosFormArray.push(this.createEventoActivo(eventoActivo));
    });
    this.refreshGrid();
  }

  private refreshGrid() {
    this.selectedRows = [];
    this.rows = [...this.eventosActivosFormArray.controls];
  }

  private createEventoActivo(eventoActivo: EventoActivoDataView) {
    return this.fb.group({
      pathArchestra: eventoActivo.pathArchestra,
      balanza: eventoActivo.balanza,
      sentido: eventoActivo.sentido,
      estadoBalanza: eventoActivo.estadoBalanza,
      aviso: eventoActivo.aviso,
      fechaHora: eventoActivo.fechaHora,
      idBitacora: eventoActivo.idBitacora,
      accion: eventoActivo.accion,
      idDispositivo: eventoActivo.idDispositivo
    });
  }

  onResolverAccion() {
    const parametrosAccion: ParametrosAccion = {
      idBitacora: parseInt(this.selectedRows[0].value.idBitacora, 10),
      pathArchestra: this.selectedRows[0].value.pathArchestra,
      idDispositivo: parseInt(this.selectedRows[0].value.idDispositivo, 10)
     };

    switch (this.selectedRows[0].value.accion) {
      case 'ResolverEventoTarjetaMatricula':
            this.ModalResolverTarjetaMatricula.open(parametrosAccion);
            break;
      case 'ResolverEventoAutorizaciones':
            this.ModalResolverAutorizaciones.open(parametrosAccion);
            break;
      case 'ResolverEventoPlataformaRequerida':
            this.ModalResolverPlataformaRequerida.open(parametrosAccion);
            break;
      case 'ResolverEventoPlataformaDescarga':
            this.ModalResolverPlataformaDescarga.open(parametrosAccion);
            break;
      case 'SeleccionarBalanzaSalida':
            this.ModalSeleccionarBalanzaSalida.open(parametrosAccion);
            break;
    }
  }
}
