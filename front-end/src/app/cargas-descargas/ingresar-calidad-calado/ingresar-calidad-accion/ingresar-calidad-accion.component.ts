import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccionesCalidad } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-ingresar-calidad-accion',
  templateUrl: './ingresar-calidad-accion.component.html',
  styleUrls: ['./ingresar-calidad-accion.component.css']
})
export class AccionComponent implements OnChanges {

  @Input() accionForm: FormGroup;
  @Input() accionesHabilitadas: any[];
  aptoDescargaActivado = true;
  rechazarActivado = true;
  pendienteSupervisorActivado = true;
  pendienteEntregadorActivado = true;
  pendienteLaboratorioActivado = true;
  aceptarCalidadActivado = true;

  aptoDescarga: AccionesCalidad = AccionesCalidad.AptoDescarga;
  rechazar: AccionesCalidad = AccionesCalidad.Rechazar;
  pendienteSupervisor: AccionesCalidad = AccionesCalidad.PendienteSupervisor;
  pendienteEntregador: AccionesCalidad = AccionesCalidad.PendienteEntregador;
  pendienteLaboratorio: AccionesCalidad = AccionesCalidad.PendienteLaboratorio;
  aceptarCalidad: AccionesCalidad = AccionesCalidad.aceptarCalidad;


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accionesHabilitadas'] && changes['accionesHabilitadas'].currentValue) {
      this.aptoDescargaActivado =  this.accionesHabilitadas.find(e => e.accion === 'aptoDescargaActivado').activada;
      this.rechazarActivado =  this.accionesHabilitadas.find(e => e.accion === 'rechazarActivado').activada;
      this.pendienteSupervisorActivado =  this.accionesHabilitadas.find(e => e.accion === 'pendienteSupervisorActivado').activada;
      this.pendienteEntregadorActivado =  this.accionesHabilitadas.find(e => e.accion === 'pendienteEntregadorActivado').activada;
      this.pendienteLaboratorioActivado =  this.accionesHabilitadas.find(e => e.accion === 'pendienteLaboratorioActivado').activada;
      this.aceptarCalidadActivado =  this.accionesHabilitadas.find(e => e.accion === 'aceptarCalidadActivado').activada;
    }
  }

}
