import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { EventoActivoDataView } from '../../shared/evento-activo-data-view';
import { DetalleEventosPendientesComponent } from './detalle-eventos-pendientes/detalle-eventos-pendientes.component';
import { ResolverEventoService } from './resolver-eventos-pendientes.service';

@Component({
  selector: 'yrd-resolver-eventos-pendientes',
  templateUrl: './resolver-eventos-pendientes.component.html',
  styleUrls: ['./resolver-eventos-pendientes.component.css']
})
export class ResolverEventosPendientesComponent implements OnInit {

  @ViewChild('detalle') detalle: DetalleEventosPendientesComponent;
  form: FormGroup;
  eventosActivos: EventoActivoDataView[];
  constructor(private readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly service: ResolverEventoService) {}

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  private getData() {
    this.service.getEventosActivos().subscribe((datos: EventoActivoDataView[]) => {
      this.detalle.setEventosActivos(datos);
    });
  }

  private createForm() {
    this.form = this.fb.group({
      detalle: this.fb.group({
        eventosActivos: this.fb.array([])
      })
    });
    this.fcService.initialize(this.form);
  }
}
