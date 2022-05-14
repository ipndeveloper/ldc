import { Component , Input, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { patenteCamionDistintaPatenteAcopladoValidator } from '../../shared/validators/patente.validator';
import { choferInhabilitadoValidator } from '../../shared/validators/buscadores.validator';
import { Terminal } from '../../../shared/data-models/terminal';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DesplegableCosechaComponent } from '../../../shared/desplegable-cosecha/desplegable-cosecha.component';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { TipoFinalidad } from '../../../shared/enums/enums';
import { DatosDocumentoCerealesComponent } from '../../shared/datos-documento-base/datos-documento-cereales.component';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { MovimientoCerealSubproducto } from '../../../shared/data-models/movimiento-cereal-subproducto';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { kgsBrutosGreaterThanKgsTara } from '../../controlar-descarga-camion-insumos/datos-documento-transportes-varios/controlar-descarga-camion-transportes-varios.validator';
import { PatentesComponent } from '../../../shared/patentes/patentes.component';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../../shared/cupo/service/cupo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

@Component({
  selector: 'yrd-datos-documento-controlar-descarga-subproductos',
  templateUrl: './datos-documento-controlar-descarga-subproductos.component.html',
  styleUrls: ['./datos-documento-controlar-descarga-subproductos.component.css'],
  providers: [FormComponentService]
})
export class DatosDocumentoControlarDescargaSubproductosComponent
              extends DatosDocumentoCerealesComponent
              implements OnInit, AfterViewInit {

  @Input() circuito: Circuito;
  @Input() tipoProducto: TipoProducto;
  @Input() esConsulta = false;
  @Input() debeDeshabilitarControlesPorMovimientoAplicadoEnSan = false;
  @Input() esModificacionFueraPuesto: boolean;
  @Input() esFueraCircuito: boolean;
  @Input() terminal: Terminal;
  @Input() mostrarEncabezado: true;
  @Input() circuitoContemplaCupo: boolean;
  @ViewChild('cosecha') desplegableCosechaComponent: DesplegableCosechaComponent;
  @ViewChild('patentes') patentesComponent: PatentesComponent;

  datosDocumentoForm: FormGroup;

  validationMessagesKilosBrutos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosBruto),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, '0'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros,
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, Resources.Labels.KilosTara),
    max: 'El Campo Kilos Bruto debe ser menor a 2,147,483,647'
  };

  validationMessagesKilosTara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosTara),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosTara, '0'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros,
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.KilosTara, Resources.Labels.KilosBruto),
    max: 'El Campo Kilos Tara debe ser menor a 2,147,483,647'
  };

  validationMessagesObservaciones = {
    maxlength: 'Debe ingresar menos de 250 caracteres'
  };

  validationMessagesNumeroCEE = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroCEE),
    minlength: 'El CEE ingresado debe tener 14 dígitos y ser distinto de cero'
  };

  validationMessagesKilometrosRecorridos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilometrosRecorridos),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilometrosRecorridos, '0')
  };

  validationMessagesTarifaReferencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaDeReferencia),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaDeReferencia, '0')
  };

  validationMessagestarifaTN = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaTN),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaTN, '0')
  };

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  validationMessagesFechaCarga = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaCarga)
  };

  validationMessagesFechaVencimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaVencimiento)
  };

  validationMessagesTransportista = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Transportista),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  validationMessagesChofer = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Chofer),
    choferInhabilitado: Resources.Messages.ElChoferSeEncuentraInhabilitadoParaElIngreso,
    choferPenalizado: Resources.Messages.ElChoferSeEncuentraPenalizadoParaElIngreso,
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesTitular = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Titular),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesCorredor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Corredor),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesDestinatario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destinatario),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesIntermediario = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesRemitenteComercial = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesEntregador = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProcedencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Procedencia)
  };

  validationMessagesCosecha = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cosecha)
  };

  validationMessagesMotivoCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MotivoCupo)
  };


  constructor(fcService: FormComponentService,
              private readonly fb: FormBuilder,
              eventsNotifierService: DescargaEventsNotifierService,
              parametrosTerminalService: ParametrosTerminalService,
              apiService: ApiService,
              cupoService: CupoService,
              popupService: PopupService,
              finalidadService: FinalidadService,
              public readonly authService: AuthService,
              public readonly productoPorTerminalService: AdministrarProductosHabilitadosPorTerminalService) {

    super(eventsNotifierService,
          parametrosTerminalService,
          fcService,
          apiService,
          cupoService,
          popupService,
          finalidadService,
          authService,
          productoPorTerminalService);

    this.tipoProducto = new TipoProducto(1, '');
  }

  ngOnInit() {
     this.createForm();
     super.subscribeFormInteraction();
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.datosDocumentoForm);
    this.setearValoresPorDefecto();
    this.subscribeToControlChanges();
  }

  resetForm() {
    this.fcService.resetForm({emitEvent: true});
    this.createForm();
    this.fcService.initialize(this.datosDocumentoForm);
    this.setearValoresPorDefecto();
    this.subscribeToControlChanges();
    this.movimiento = undefined as any;
  }

  protected createForm() {
    this.datosDocumentoForm = this.fb.group({
      patentes: this.fb.group({
        patenteCamion: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
        patenteAcoplado: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8)])],
      }, { validator: patenteCamionDistintaPatenteAcopladoValidator() }),
      estadoCupo: { value: '', disabled: true },
      fechaCarga: [new Date().toLocalISOString().substring(0, 10), Validators.required],
      codigoCupo: [{value: '', disabled: true}, Validators.required ],
      usuarioCupoSAN: [{ value: '', disabled: true }],
      motivoCupo: {value: '', disabled: true},
      estado: { value: '', disable: true },
      fechaVencimiento: ['', Validators.required],
      turnoPlaya: { value: '', disabled: true },
      tarjeta: [{ value: '', disabled: true }],
      producto: [undefined, [Validators.required, searchValidator()]] ,
      cosecha: [undefined, Validators.required],
      titular: [undefined, [Validators.required, searchValidator()]],
      opONCCATitular: { value: '', disabled: true },
      vendedor: { value: undefined, disabled: true },
      opONCCAVendedor: { value: '', disabled: true },
      intermediario: [undefined, searchValidator()],
      opONCCAIntermediario: { value: '', disabled: true },
      remitenteComercial: [undefined, searchValidator()],
      opONCCARemitenteComercial: { value: '', disabled: true },
      corredor: [undefined, [Validators.required, searchValidator()]],
      fleteCargoLdc: [false],
      tipoPesada: [{id: 1}, Validators.required],
      entregador: [undefined, searchValidator()],
      destinatario: [this.destinatarioPorDefecto, [Validators.required, searchValidator()]],
      kilosBrutosTaraGroup: this.fb.group({
        kilosBruto: [{value: this.kgsBrutosEstimados, disabled: this.esConsulta},
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?\d+$/),
          Validators.max(2147483647)
        ]],
        kilosTara: [{value: this.kgsTaraEstimados, disabled: this.esConsulta},
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?\d+$/),
          Validators.max(2147483647) // VAL034
        ]],
      }, { validator: kgsBrutosGreaterThanKgsTara }),
      kilosNeto: [{value: '', disabled: true}, Validators.required ],
      finalidad: [{id: TipoFinalidad.CompraVenta}, Validators.required],
      procedencia: [{value: '', disabled: false}, Validators.required ],
      sedeOrigen: [{value: '', disabled: true} ],
      destino: [{value: this.terminal.codigoAfip, disabled: true}],
      sedeDestino: [{value: this.terminal.sede, disabled: true} ],
      transportista: [undefined, [Validators.required]],
      chofer: ['', [Validators.required, choferInhabilitadoValidator(), searchValidator()]],
      observaciones: ['', Validators.maxLength(250)],
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

  loadMovimiento(movimiento: MovimientoCerealSubproducto) {
      this.movimiento = movimiento as MovimientoCerealGrano;

      const esModificacionYTieneCupo = !!movimiento.codigoCupo && !this.esConsulta;
      const esConsultaOEsAplicadoEnSan =
        this.esConsulta || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan;

      this.fcService.setValue(`patentes.patenteAcoplado`, movimiento.patenteAcoplado, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`patentes.patenteCamion`, movimiento.patenteCamion, {onlySelf: true}, this.esConsulta);
      let fecha = movimiento.fechaCarga ? new Date(movimiento.fechaCarga).toLocalISOString().substring(0, 10) : undefined;
      this.fcService.setValue(`fechaCarga`, fecha, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`codigoCupo`, movimiento.codigoCupo, {onlySelf: true});
      this.fcService.setValue(`usuarioCupoSAN`, movimiento.usuarioCupoSAN, { onlySelf: true }, true);
      fecha = movimiento.fechaVencimiento ? new Date(movimiento.fechaVencimiento).toLocalISOString().substring(0, 10) : '';
      this.fcService.setValue(`fechaVencimiento`, fecha, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`turnoPlaya`, movimiento.turnoPlaya, {onlySelf: true});
      this.fcService.setValue(`tarjeta`, movimiento.nroTarjeta, {onlySelf: true}, true);
      this.fcService.setValue(`intermediario`, movimiento.intermediario, {onlySelf: false}, esConsultaOEsAplicadoEnSan);
      this.fcService.setValue(`corredor`, movimiento.corredorComprador,
                              {onlySelf: true},
                              esConsultaOEsAplicadoEnSan || esModificacionYTieneCupo);
      this.fcService.setValue(`remitenteComercial`, movimiento.remitenteComercial, {onlySelf: false}, esConsultaOEsAplicadoEnSan);
      this.fcService.setValue(`fleteCargoLdc`, movimiento.fleteCargoLdc, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`tipoPesada`, movimiento.tipoPesada, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`entregador`, movimiento.entregador, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`kilosBrutosTaraGroup.kilosBruto`, movimiento.kgBruto , {onlySelf: true}, esConsultaOEsAplicadoEnSan);
      this.fcService.setValue(`kilosBrutosTaraGroup.kilosTara`, movimiento.kgTara, {onlySelf: true}, esConsultaOEsAplicadoEnSan);
      this.fcService.setValue(`kilosNeto`, movimiento.kgNeto, {onlySelf: true}, true);
      this.fcService.setValue(`vendedor`, movimiento.vendedor, {onlySelf: true}, true);
      this.fcService.setValue(`transportista`, movimiento.transportista, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`chofer`, movimiento.chofer, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`observaciones`, movimiento.observaciones, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`finalidad`, movimiento.finalidad, {onlySelf: true},
                              esConsultaOEsAplicadoEnSan || esModificacionYTieneCupo);
      setTimeout(() => {
        this.fcService.setValue(`sedeDestino`, movimiento.sedeDestinatario, {onlySelf: true});
        this.fcService.setValue(`motivoCupo`, movimiento.motivoCupo, {onlySelf: true}, this.esConsulta);
        this.fcService.setValue(`titular`, movimiento.titular, {onlySelf: true}, esConsultaOEsAplicadoEnSan);
        this.fcService.setValue(`destinatario`, movimiento.destinatario,
                                {onlySelf: true},
                                esConsultaOEsAplicadoEnSan || esModificacionYTieneCupo);
        this.fcService.setValue(`producto`, movimiento.producto,
                                {onlySelf: false},
                                this.esConsulta || this.esFueraCircuito || esModificacionYTieneCupo);
        this.fcService.setValue(`procedencia`, movimiento.procedencia, {onlySelf: true}, this.esConsulta);
        this.fcService.setValue(`cosecha`, movimiento.cosecha, {onlySelf: true}, this.esConsulta);
        this.fcService.setValue(`sedeOrigen`, movimiento.sedeVendedor, {onlySelf: true});
      }, 500);
  }

  protected subscribeToControlChanges() {
    super.subscribirseCambiosDocumento();
    this.subscribeKilosTara();
    this.subscribeKilosBruto();
  }

  private subscribeKilosTara(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    if (kilosTara) {
      kilosTara.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private subscribeKilosBruto(): void {
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosBruto) {
      kilosBruto.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
    }
  }

  private calcularkilosNeto(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosTara && kilosBruto &&
        kilosTara.value != null && kilosTara.value !== undefined &&
        kilosBruto.value != null && kilosBruto.value !== undefined) {
        this.datosDocumentoForm.patchValue({kilosNeto: +kilosBruto.value - +kilosTara.value});
    }
  }

  protected subscribeCambioTitularRemitenteComercial() {
    const titular = this.datosDocumentoForm.get('titular');
    const remitenteComercial = this.datosDocumentoForm.get('remitenteComercial');
    const vendedor = this.datosDocumentoForm.get('vendedor');

    if (titular && remitenteComercial && vendedor) {
      this.subscribeCambioTitular(titular, remitenteComercial, vendedor);
      this.subscribeRemitenteComercial(titular, remitenteComercial, vendedor);
    }
  }

  private setearValoresPorDefecto(): void {
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
    this.obtenerKgsEstimadosPorDefecto(this.esAlta);
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.patentesComponent) {
        this.patentesComponent.setFocus();
      }
    }, 0);
  }
}
