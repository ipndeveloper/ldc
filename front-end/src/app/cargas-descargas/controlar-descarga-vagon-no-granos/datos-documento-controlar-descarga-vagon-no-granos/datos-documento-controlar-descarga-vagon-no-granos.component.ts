import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { MovimientoCerealSubproducto } from '../../../shared/data-models/movimiento-cereal-subproducto';
import { DatosDocumentoVagonBaseComponent } from '../../shared/datos-documento-base/datos-documento-vagon-base.component';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { kgsBrutosGreaterThanKgsTara } from '../../controlar-descarga-camion-insumos/datos-documento-transportes-varios/controlar-descarga-camion-transportes-varios.validator';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../../shared/cupo/service/cupo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

@Component({
  selector: 'yrd-datos-documento-controlar-descarga-vagon-no-granos',
  templateUrl: './datos-documento-controlar-descarga-vagon-no-granos.component.html',
  styleUrls: ['./datos-documento-controlar-descarga-vagon-no-granos.component.css'],
  providers: [FormComponentService]
})
export class DatosDocumentoControlarDescargaVagonNoGranosComponent
    extends DatosDocumentoVagonBaseComponent<MovimientoCerealSubproducto>
    implements OnInit, AfterViewInit {

  constructor(protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              eventsNotifierService: DescargaEventsNotifierService,
              parametrosTerminalService: ParametrosTerminalService,
              apiService: ApiService,
              cupoService: CupoService,
              popupService: PopupService,
              finalidadService: FinalidadService,
              public readonly authService: AuthService,
              public readonly productoPorTerminalService: AdministrarProductosHabilitadosPorTerminalService) {
    super(fcService,
          eventsNotifierService,
          parametrosTerminalService,
          apiService,
          cupoService,
          popupService,
          finalidadService,
          authService,
          productoPorTerminalService);
    this.tipoProducto = new TipoProducto(5, '');
  }


  ngOnInit() {
    this.createForm();
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
    this.subscribeFormInteraction();
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.datosDocumentoForm);
    this.subscribirseCambiosDocumento();
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
  }

  createForm() {
    this.datosDocumentoForm = this.fb.group({
      estadoMovimiento: { value: undefined, disabled: true },
      fechaCarga: [new Date().toLocalISOString().substring(0, 10), Validators.required],
      fechaVencimiento: [undefined, Validators.required],
      numeroCEE: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      producto: [undefined, [Validators.required, searchValidator()]],
      titularCartaPorte: [undefined, [Validators.required, searchValidator()]],
      opONCCATitular: { value: '', disabled: true },
      vendedor: { value: undefined, disabled: true },
      opONCCAVendedor: { value: '', disabled: true },
      cosecha: [undefined, Validators.required],
      intermediario: [undefined, searchValidator()],
      opONCCAIntermediario: { value: '', disabled: true },
      remitenteComercial: [undefined, searchValidator()],
      opONCCARemitenteComercial: { value: '', disabled: true },
      corredorComprador: [undefined, [Validators.required, searchValidator()]],
      entregador: [undefined, searchValidator()],
      destinatario: [this.destinatarioPorDefecto, [Validators.required, searchValidator()]],
      transportista: [{value: undefined, disabled: false}, Validators.required],
      ferrocarril: [{value: undefined, disabled: false}, [Validators.required]],
      operativo: [{value: '', disabled: false}, Validators.required],
      finalidad: [{id: 1}, Validators.required],
      procedencia: [{value: '', disabled: false}, Validators.required ],
      sedeOrigen: [{value: '', disabled: true} ],
      destino: [{value: this.terminal.codigoAfip, disabled: true}],
      sedeDestino: [{value: this.terminal.sede, disabled: true} ],
      observaciones: ['', Validators.maxLength(250)],
      datosVagon: this.fb.group({
        numeroVagon:   [{value: '', disabled: this.esConsulta}, Validators.required],
        kilosBrutosTaraGroup: this.fb.group({
          kilosBruto: [{value: '', disabled: this.esConsulta},
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^\d+$/),
            Validators.max(2147483647)
          ]],
          kilosTara: [{value: '', disabled: this.esConsulta},
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^\d+$/),
            Validators.max(2147483647) // VAL034
          ]],
        }, { validator: kgsBrutosGreaterThanKgsTara }),
        kilosNeto: [{value: '', disabled: true}, Validators.required ],
        tarjeta: [{ value: '', disabled: true }],
        fechaEntrada: [{value: '', disabled: true}],
        fechaOperacion: [{value: '', disabled: true}],
        fechaSalida: [{value: '', disabled: true}],
      })
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

  loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.movimiento = movimiento;
    super.loadMovimiento(movimiento);
  }

  protected manejarSedeOrigen(): void {
    if (!this.esAlta && this.debeHabilitarCampo()) {
      this.fcService.disableControl('sedeOrigen');
    } else {
      super.manejarSedeOrigen();
    }
  }
}


