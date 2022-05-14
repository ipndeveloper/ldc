import { Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Terminal } from '../../../shared/data-models/terminal';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { DatosVagonComponent } from '../datos-vagon/datos-vagon.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../services/parametros-terminal.service';
import { MovimientoCereal } from '../../../shared/data-models/movimiento-cereal';
import { DatosDocumentoCerealesComponent } from './datos-documento-cereales.component';
import { ILoadMovimiento } from './load-movimiento.interface';
import { Productos } from '../../../shared/enums/enums';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../cupo/service/cupo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

export abstract class DatosDocumentoVagonBaseComponent<TMovimiento extends MovimientoCereal>
  extends DatosDocumentoCerealesComponent
  implements ILoadMovimiento<TMovimiento> {

  @Input() circuito: Circuito;
  @Input() tipoProducto: TipoProducto;
  @Input() esConsulta = false;
  @Input() terminal: Terminal;
  @Input() movimiento: MovimientoCerealGrano;
  @Input() esFueraCircuito: boolean;
  @Input() mostrarEncabezado: true;
  @Input() esModificacionDocPorte: boolean;
  @Input() debeDeshabilitarControlesPorMovimientoAplicadoEnSan = false;
  @ViewChild('datosVagon') datosVagon: DatosVagonComponent;
  @Input() recuperoDocumentoPorte = false;

  datosDocumentoForm: FormGroup;

  validationMessagesTransportista = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Transportista),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesFerrocarril = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Ferrocarril),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesObservaciones = {
    maxlength: 'Debe ingresar menos de 250 caracteres'
  };

  validationMessagesNumeroCEE = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroCEE),
    minlength: 'El CEE ingresado debe tener 14 dígitos y ser distinto de cero'
  };

  validationMessagesOperativo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Operativo),
  };

  validationMessagesFechaCarga = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaCarga)
  };

  validationMessagesFechaVencimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaVencimiento)
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  validationMessagesCosecha = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cosecha)
  };

  validationMessagesTitular = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Titular),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesCorredorComprador = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CorredorComprador),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesDestinatario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destinatario),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProcedencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Procedencia)
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

  constructor(protected readonly fcService: FormComponentService,
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

    this.tipoProducto = new TipoProducto(5, '');
  }

  resetForm() {
    this.fcService.resetForm({emitEvent: true});
    this.createForm();
    this.fcService.initialize(this.datosDocumentoForm);
    this.subscribirseCambiosDocumento();
  }


  resetDatosVagon() {
    this.datosVagon.createSubscriptions();
  }

  focusVagon() {
    this.datosVagon.setFocusVagon();
  }

  getErroresOperadoresOncca(): string | null {
    const titularCartaPorte = this.datosDocumentoForm.get('titularCartaPorte');
    const intermediario = this.datosDocumentoForm.get('intermediario');
    const entregador = this.datosDocumentoForm.get('entregador');
    const remitenteComercial = this.datosDocumentoForm.get('remitenteComercial');
    const corredorComprador = this.datosDocumentoForm.get('corredorComprador');

    let mensajeError = '';

    if (titularCartaPorte && titularCartaPorte.value && titularCartaPorte.value.mensajeErrorOncca) {
      mensajeError += titularCartaPorte.value.mensajeErrorOncca + ' ';
    }

    if (intermediario && intermediario.value && intermediario.value.mensajeErrorOncca) {
      mensajeError += intermediario.value.mensajeErrorOncca + ' ';
    }

    if (entregador && entregador.value && entregador.value.mensajeErrorOncca) {
      mensajeError += entregador.value.mensajeErrorOncca + ' ';
    }

    if (remitenteComercial && remitenteComercial.value && remitenteComercial.value.mensajeErrorOncca) {
      mensajeError += remitenteComercial.value.mensajeErrorOncca + ' ';
    }

    if (corredorComprador && corredorComprador.value && corredorComprador.value.mensajeErrorOncca) {
      mensajeError += corredorComprador.value.mensajeErrorOncca + ' ';
    }

    return mensajeError;
  }

  loadMovimiento(movimiento: TMovimiento) {
    let fecha = movimiento.fechaCarga ? new Date(movimiento.fechaCarga).toLocalISOString().substring(0, 10) : undefined;
    this.fcService.setValue(`fechaCarga`, fecha, {onlySelf: true}, this.debeHabilitarCampo());
    fecha = movimiento.fechaVencimiento ? new Date(movimiento.fechaVencimiento).toLocalISOString().substring(0, 10) : undefined;

    this.fcService.setValue(`fechaVencimiento`, fecha ? fecha : '', {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`numeroCEE`, movimiento.codigoEmisionElectronica, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`intermediario`, movimiento.intermediario, {onlySelf: false},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`corredorComprador`, movimiento.corredorComprador, {onlySelf: true},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`remitenteComercial`, movimiento.remitenteComercial, {onlySelf: false},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`mercadoTermino`, '', {onlySelf: true}, true);
    this.fcService.setValue(`entregador`, movimiento.entregador, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`finalidad`, movimiento.finalidad, {onlySelf: true},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`sedeOrigen`, movimiento.sedeVendedor, {onlySelf: true});
    this.fcService.setValue(`observaciones`, movimiento.observaciones, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`ferrocarril`, movimiento.ferrocarril, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`transportista`, movimiento.transportista, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`operativo`, movimiento.operativo, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`producto`, movimiento.producto, {onlySelf: false}, this.debeHabilitarCampo() || this.esFueraCircuito);

    this.fcService.setValue('datosVagon.fechaEntrada', movimiento.fechaEntrada, {onlySelf: true}, true);
    this.fcService.setValue('datosVagon.fechaSalida', movimiento.fechaSalida, {onlySelf: true}, true);
    this.fcService.setValue('datosVagon.fechaOperacion', movimiento.fechaOperacion, {onlySelf: true}, true);

    if (!this.esModificacionDocPorte) {
      this.completarPesaje(movimiento);
    } else {
      this.fcService.disableControl(`datosVagon.tarjeta`);
      this.fcService.disableControl(`datosVagon.kilosBrutosTaraGroup.kilosBruto`);
      this.fcService.disableControl(`datosVagon.kilosBrutosTaraGroup.kilosTara`);
      this.fcService.disableControl(`datosVagon.numeroVagon`);
    }
    this.fcService.setValue(`kilosNeto`, movimiento.kgNeto, {onlySelf: true}, true);

    this.fcService.setValue(`sedeDestino`, movimiento.sedeDestinatario, {onlySelf: true});

    setTimeout(() => {
      this.fcService.setValue(`titularCartaPorte`, movimiento.titular, {onlySelf: true},
        this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan
        || this.debeDeshabilitarTitular());
      this.fcService.setValue(`destinatario`, movimiento.destinatario, {onlySelf: true},
        this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
      this.fcService.setValue(`cosecha`, movimiento.cosecha, {onlySelf: true},
        this.debeHabilitarCampo() || movimiento.producto.id === Productos.SojaEPA);
      this.fcService.setValue(`procedencia`, movimiento.procedencia, {onlySelf: true},
        this.debeHabilitarCampo() || movimiento.producto.id === Productos.SojaEPA);
    }, 500);
  }

  protected debeHabilitarCampo(): boolean | undefined {
    return this.esConsulta || (!this.esFueraCircuito && !this.esModificacionDocPorte);
  }

  protected debeDeshabilitarSedePorConsultaOModificacionVagones(): boolean {
    return this.debeHabilitarCampo() || false;
  }

  protected debeDeshabilitarTitular(): boolean | undefined {
    return this.debeHabilitarCampo();
  }
  completarPesaje(movimiento: TMovimiento) {
    this.fcService.setValue(`datosVagon.tarjeta`, movimiento.nroTarjeta, { onlySelf: true }, true);
    this.fcService.setValue(`datosVagon.kilosBrutosTaraGroup.kilosBruto`, movimiento.kgBruto, { onlySelf: true },
      this.esConsulta || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`datosVagon.kilosBrutosTaraGroup.kilosTara`, movimiento.kgTara, { onlySelf: true },
      this.esConsulta || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`datosVagon.numeroVagon`, movimiento.numeroVagon, { onlySelf: true }, this.esConsulta);
  }
}
