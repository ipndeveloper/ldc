import { Component, OnInit, OnChanges, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { MovimientoCargaCamion } from '../../../shared/data-models/movimiento-carga';
import { Resources } from '../../../../locale/artifacts/resources';
import { TiposProducto, TiposCartaPorte, Sociedades, Finalidades } from '../../../shared/enums/enums';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { ConsultarStockDataView } from '../../../shared/data-models/consulta-stock-data-view';
import { AuthService } from '../../../core/services/session/auth.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { RemitenteComercial } from '../../../shared/data-models/remitente-comercial';
import { DatosDocumentoBaseComponent } from '../../shared/datos-documento-base/datos-documento-base.component';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-datos-documento-controlar-carga-camion',
  templateUrl: './datos-documento-controlar-carga-camion.component.html',
  styleUrls: ['./datos-documento-controlar-carga-camion.component.css']
})
export class DatosDocumentoControlarCargaCamionComponent extends DatosDocumentoBaseComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() esConsulta: boolean;
  @Input() movimientoCarga: MovimientoCargaCamion;
  @Input() idViaje: number;
  @Input() documentoPorte: AbstractControl;
  @Input() tipoProducto: TipoProducto;
  @Input() esModificacionOConsultaMovimiento: boolean;
  @Input() esFueraCircuito: boolean;
  @Input() mostrarEncabezado = true;
  @Input() esModificacionFueraDePuesto: boolean;
  @Input() esCartaPorteElectronica = false;
  readonly esAcopio: boolean;
  readonly terminal: Terminal;

  datosDocumentoForm: FormGroup;
  marcagestionaCot: boolean;

  readonly validationMessagesNumeroCEE = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroCEE),
    minlength: Resources.Messages.ElCeeIngresadoDebeTener14DigitosYSerDistintoDeCero
  };

  readonly validationMessagesFechaVencimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaVencimiento)
  };

  readonly validationMessagesTipoPesada = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoPesada),
  };

  readonly validationMessagesObservaciones = {
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  readonly validationMessagesCondicionManipuleo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.LugarCarga),
    stockInsuficiente: Resources.Messages.StockInsuficiente
  };

  readonly validationMessagesSedeDestino = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SedeDestino)
  };

  readonly validationMessagesTipoGrano = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoGrano)
  };

  get esMovimientoCereal(): boolean {
    return this.tipoProducto.id === TiposProducto.Cereal;
  }

  get esFueraDeCircuito(): boolean {
    return this.esFueraCircuito;
  }

  get esConsultadeFueraCircuito(): boolean {
    return this.esFueraCircuito === undefined ? true : false;
  }

  constructor(private readonly fb: FormBuilder,
              protected readonly fcService: FormComponentService,
              protected readonly parametrosTerminalService: ParametrosTerminalService,
              protected readonly authService: AuthService,
              protected readonly eventsNotifierService: DescargaEventsNotifierService) {
                super (eventsNotifierService, parametrosTerminalService, fcService);
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.esAcopio = userContext.terminal.puerto.esAcopio;
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit() {
    this.subscribirseCambiosDocumento();
  }

  ngOnChanges(): void {
    if (this.movimientoCarga) {
      this.habilitarTipoCartaPorte();
      this.loadMovimiento();
    }
    this.deshabilitaPorRegimen();
  }

  protected subscribirseCambiosDocumento() {
    this.subscribeCambioTitularRemitenteComercial();
    this.subscribeCambioDestinatario();
  }

  protected subscribeCambioTitularRemitenteComercial() {
    const titular = this.datosDocumentoForm.get('titular');
    const remitenteComercial = this.datosDocumentoForm.get('remitenteComercial');
    const vendedor = this.datosDocumentoForm.get('vendedor');

    if (titular && remitenteComercial && vendedor) {
      this.subscribeRemitenteComercial(titular, remitenteComercial, vendedor);
    }
  }

  protected subscribeRemitenteComercial(titular: AbstractControl, remitenteComercial: AbstractControl, vendedor: AbstractControl) {
    remitenteComercial.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((re: RemitenteComercial) => {
      if (re && remitenteComercial.value) {
        this.fcService.setValue('opONCCARemitenteComercial', re.codigoOperadorOncca, {onlySelf: true, emitEvent: false});
        if (!this.circuitoContemplaCupo ||
            (this.circuitoContemplaCupo &&
               !this.esAlta &&
               !this.esConsulta)) {
          this.fcService.setValue('opONCCAVendedor', re.codigoOperadorOncca, {onlySelf: true, emitEvent: false});
          vendedor.setValue(re);
        }
      } else {
        this.fcService.setValue('opONCCARemitenteComercial', '', {onlySelf: true, emitEvent: false});
        if (!this.circuitoContemplaCupo ||
            (this.circuitoContemplaCupo &&
              !this.esAlta &&
              !this.esConsulta)) {
          if (titular.value) {
            vendedor.setValue(titular.value);
            this.fcService.setValue('opONCCAVendedor', titular.value.codigoOperadorOncca, {onlySelf: true, emitEvent: false});
          } else {
            vendedor.reset();
            this.fcService.setValue('opONCCAVendedor', '', {onlySelf: true, emitEvent: false});
          }
        }
      }
      vendedor.updateValueAndValidity();
    });
  }

  protected resetForm() {
  }
  protected loadMovimiento(): void {
    this.fcService.setValue('datosDocumento.fechaVencimiento', this.movimientoCarga.fechaVencimiento, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue('datosDocumento.numeroCEE', this.movimientoCarga.codigoEmisionElectronica, { onlySelf: true },
    this.esConsulta);
    this.fcService.setValue('datosDocumento.observaciones', this.movimientoCarga.observaciones, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue('datosDocumento.tipoPesada',
      this.movimientoCarga.tipoPesada, { onlySelf: true }, this.esConsulta || this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.estadoViaje', this.movimientoCarga.estadoViaje, { onlySelf: true });
    this.fcService.setValue('datosDocumento.estadoCabecera', this.movimientoCarga.estadoCabecera, { onlySelf: true });
    this.fcService.setValue('datosDocumento.patentes.patenteAcoplado', this.movimientoCarga.patenteAcoplado, { onlySelf: true });
    this.fcService.setValue('datosDocumento.patentes.patenteCamion', this.movimientoCarga.patenteCamion, { onlySelf: true });
    this.fcService.setValue('datosDocumento.ordenCarga', this.movimientoCarga.ordenCarga, { onlySelf: true });
    this.fcService.setValue('datosDocumento.numeroViaje', this.movimientoCarga.numeroViaje, { onlySelf: true });
    this.fcService.setValue('datosDocumento.numeroContrato', this.movimientoCarga.numeroContrato, { onlySelf: true });
    this.fcService.setValue('datosDocumento.producto', this.movimientoCarga.producto, { onlySelf: true });
    this.fcService.setValue('datosDocumento.cosecha', this.movimientoCarga.cosecha, { onlySelf: true });
    this.fcService.setValue('datosDocumento.titular', this.movimientoCarga.titular, { onlySelf: true });
    this.fcService.setValue('datosDocumento.vendedor', this.movimientoCarga.vendedor, { onlySelf: true });
    this.fcService.setValue('datosDocumento.remitenteComercial', this.movimientoCarga.remitenteComercial, { onlySelf: true });
    this.fcService.setValue('datosDocumento.corredorComprador', this.movimientoCarga.corredorComprador, { onlySelf: true });
    this.fcService.setValue('datosDocumento.entregador', this.movimientoCarga.entregador, { onlySelf: true });
    this.fcService.setValue('datosDocumento.cantidadEst', this.movimientoCarga.cantidadEstimada, { onlySelf: true });
    this.fcService.setValue('datosDocumento.destinatario', this.movimientoCarga.destinatario, { onlySelf: true });
    this.fcService.setValue('datosDocumento.finalidad', this.movimientoCarga.finalidad.descripcion, { onlySelf: true });
    this.fcService.setValue('datosDocumento.establecimiento', this.movimientoCarga.establecimiento, { onlySelf: true });
    this.fcService.setValue('datosDocumento.sedeOrigen',
                            this.movimientoCarga.sedeVendedor, { onlySelf: true });
    this.fcService.setValue('datosDocumento.transportista', this.movimientoCarga.transportista, { onlySelf: true });
    this.fcService.setValue('datosDocumento.chofer', this.movimientoCarga.chofer, { onlySelf: true });
    this.fcService.setValue('datosDocumento.datosEntrega.calle', this.movimientoCarga.calle, { onlySelf: true });
    this.fcService.setValue('datosDocumento.datosEntrega.numero', this.movimientoCarga.numero, { onlySelf: true });
    this.fcService.setValue('datosDocumento.datosEntrega.localidad', this.movimientoCarga.localidad, { onlySelf: true });
    this.fcService.setValue('datosDocumento.datosEntrega.codigoPostal', this.movimientoCarga.codigoPostal, { onlySelf: true });
    this.fcService.setValue('datosDocumento.datosEntrega.provincia', this.movimientoCarga.provincia, { onlySelf: true });
    this.fcService.setValue('datosDocumento.kilometrosRecorridos', this.movimientoCarga.kilometrosRecorridos, { onlySelf: true });
    this.fcService.setValue('datosDocumento.usuarioAlta', this.movimientoCarga.usuarioAltaCarga, { onlySelf: true });
    this.fcService.setValue('datosDocumento.numeroTramiteCOT', this.movimientoCarga.numeroTramiteOperacionTraslado, { onlySelf: true });
    this.fcService.setValue('datosDocumento.intermediario', this.movimientoCarga.intermediario, { onlySelf: true });
    this.fcService.setValue('datosDocumento.procedencia', this.movimientoCarga.procedencia, { onlySelf: true });
    this.fcService.setValue('datosDocumento.remitenteComercial', this.movimientoCarga.remitenteComercial, { onlySelf: true });
    this.fcService.setValue('datosDocumento.tarjeta', this.movimientoCarga.numeroTarjeta, { onlySelf: true });
    this.fcService.setValue('datosDocumento.kilosNeto', this.movimientoCarga.kgNeto, { onlySelf: true });
    this.fcService.setValue('datosDocumento.kilosTara', this.movimientoCarga.kgTara, { onlySelf: true });
    this.fcService.setValue('datosDocumento.kilosBruto', this.movimientoCarga.kgBruto, { onlySelf: true });
    this.fcService.setValue('datosDocumento.establecimientoDestino', this.movimientoCarga.establecimientoDestino, { onlySelf: true });
    this.fcService.setValue('datosDocumento.tarifaFletePorTn', this.movimientoCarga.tarifaFletePorTn, { onlySelf: true });
    this.fcService.setValue('datosDocumento.tarifaFleteReferencia', this.movimientoCarga.tarifaFleteReferencia, { onlySelf: true });
    this.fcService.setValue('datosDocumento.identificacionDestinacion', this.movimientoCarga.identificacionDestinacion);
    this.fcService.setValue('datosDocumento.lugarCarga',
                            this.movimientoCarga.condicionManipuleo,
                            { onlySelf: true }, this.esConsulta || this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.numeroCOT',
      this.movimientoCarga.codigoOperacionTraslado, { onlySelf: true }, !this.esFueraCircuito);

    if (this.esModificacionOConsultaMovimiento || this.movimientoCarga.tipoCartaPorte) {
      this.fcService.setValue('datosDocumento.tipoCartaPorte',
        this.movimientoCarga.tipoCartaPorte, { onlySelf: true }, (this.esConsulta || this.esFueraCircuito || !this.esMovimientoCereal));
    }
    if (this.movimientoCarga.intermediario) {
      this.fcService.setValue('datosDocumento.opONCCAIntermediario',
        this.movimientoCarga.intermediario.codigoOperadorOncca, { onlySelf: true });
    }
    if (this.movimientoCarga.remitenteComercial) {
      this.fcService.setValue('datosDocumento.opONCCARemitenteComercial',
        this.movimientoCarga.remitenteComercial.codigoOperadorOncca, { onlySelf: true });
    }
    if (this.esMovimientoCereal) {
      this.fcService.setValue('datosDocumento.numeroCTG',
        this.movimientoCarga.codigoTrazabilidadGrano, { onlySelf: true }, !this.esFueraCircuito);
      this.fcService.setValue('datosDocumento.codigoCupo', this.movimientoCarga.codigoCupo, { onlySelf: true }, true);
    }
    this.fcService.setValue('datosDocumento.sedeDestino', this.movimientoCarga.sedeDestinatario);

    if (this.movimientoCarga.sedeVendedor.esAcopio &&
       (this.movimientoCarga.finalidad.id === Finalidades.CompraVenta ||
        this.movimientoCarga.finalidad.id === Finalidades.VentaNoAdminSAN)) {
      if (this.movimientoCarga.vendedor.id === Sociedades.LDC && this.movimientoCarga.destinatario.id !== Sociedades.LDC) {
        this.fcService.setValue('datosDocumento.esVentaInterco', this.movimientoCarga.esVentaInterco, {onlySelf : true}, this.esConsulta);
      } else {
        this.fcService.setValue('datosDocumento.esVentaInterco',
          this.movimientoCarga.destinatario.id === Sociedades.LDC, {onlySelf : true}, true);
      }
    } else {
      this.fcService.setValue('datosDocumento.esVentaInterco', false, {onlySelf: true}, true);
    }
    this.fcService.setValue('datosDocumento.tipoGrano',
                            this.movimientoCarga.tipoGrano,
                            {onlySelf: true},
                            this.esConsulta || !this.esMovimientoCereal);
    this.gestionaCot(this.movimientoCarga.producto.id);
  }

  private habilitarTipoCartaPorte(): void {
    const tipoCartaPorte = this.fcService.getControl('datosDocumento.tipoCartaPorte');
    if (tipoCartaPorte && !this.esConsulta && this.esMovimientoCereal) {
      tipoCartaPorte.setValidators(Validators.required);
      tipoCartaPorte.enable();
      this.setDefaultValueTipoCartaPorte();
    }
  }


  private setDefaultValueTipoCartaPorte(): void {
    this.fcService.setValue('datosDocumento.tipoCartaPorte', { id: TiposCartaPorte.CpEmitida }, { onlySelf: true });
  }

  createForm(): void {
    this.datosDocumentoForm = this.fb.group({
      patentes: this.fb.group({
        patenteCamion: [{ value: '', disabled: true }],
        patenteAcoplado: [{ value: '', disabled: true }],
      }),
      tarjeta: { value: '', disabled: true },
      observaciones: { value: '', disabled: false },
      chofer: [{ value: undefined, disabled: true }],
      numeroContrato: { value: '', disabled: true },
      destino: { value: '', disabled: true },
      ordenCarga: { value: '', disabled: true },
      numeroViaje: { value: '', disabled: true },
      fechaVencimiento: [{ value: '', disabled: false }, Validators.required],
      estadoViaje: { value: '', disabled: true },
      tipoCartaPorte: { value: undefined, disabled: true },
      estadoCabecera: { value: '', disabled: true },
      numeroCEE: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(14), Validators.required])],
      campoEpa: { value: '', disabled: true },
      cosecha: { value: '', disabled: true },
      producto: [{ value: undefined, disabled: true }],
      titular: [{ value: '', disabled: true }],
      vendedor: { value: '', disabled: true },
      opONCCAVendedor: { value: '', disabled: true },
      intermediario: { value: '', disabled: true },
      opONCCAIntermediario: { value: '', disabled: true },
      remitenteComercial: { value: '', disabled: true },
      opONCCARemitenteComercial: { value: '', disabled: true },
      corredorComprador: [{ value: '', disabled: true }],
      tipoPesada: { value: '', disabled: false },
      corredorVendedor: { value: '', disabled: true },
      entregador: { value: '', disabled: true },
      cantidadEst: { value: '', disabled: true },
      destinatario: [{ value: '', disabled: true }],
      finalidad: [{ value: '', disabled: true }],
      sedeOrigen: [{ value: '', disabled: true }, Validators.required],
      establecimiento: { value: '', disabled: true },
      procedencia: [{ value: '', disabled: true }],
      sedeDestino: [{ value: '', disabled: true }, Validators.required],
      transportista: { value: '', disabled: true },
      kilometrosRecorridos: { value: '', disabled: true },
      usuarioAlta: { value: '', disabled: true },
      numeroTramiteCOT: { value: '', disabled: true },
      numeroCOT: { value: '', disabled: true },
      datosEntrega: this.fb.group({
        calle: { value: '', disabled: true },
        numero: { value: '', disabled: true },
        localidad: { value: '', disabled: true },
        codigoPostal: { value: '', disabled: true },
        provincia: { value: '', disabled: true }
      }),
      kilosTara: { value: '', disabled: true },
      kilosBruto: { value: '', disabled: true },
      kilosNeto: { value: '', disabled: true },
      establecimientoDestino: { value: '', disabled: true },
      tarifaFleteReferencia: { value: '', disabled: true },
      tarifaFletePorTn: { value: '', disabled: true },
      lugarCarga: [{ value: undefined, disabled: false }, Validators.required],
      numeroCTG: { value: '', disabled: true },
      identificacionDestinacion: { value: '', disabled: true },
      esVentaInterco: { value: '', disable: false },
      tipoGrano: [{ value: undefined, disabled: false }, Validators.required],
      codigoCupo: [{ value: '', disabled: true }]
    });
  }

  private loadGestionaCot(gestionaCot: boolean): void {
    if (gestionaCot) {
      if (this.esConsultadeFueraCircuito) {
        this.marcagestionaCot = gestionaCot;
      }
      if (this.esFueraCircuito) {
        this.marcagestionaCot = gestionaCot;
        this.fcService.enableControl('documentoPorte.numeroCot');
      }
    }
  }

  protected gestionaCot(idProducto: number): void {
    this.parametrosTerminalService.getGestionaCot(idProducto)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((gestionaCot: boolean) => {
        this.loadGestionaCot(gestionaCot);
      });
  }

  protected subscribeCambioDestinatario(): void {
    const destinatarioCtrl = this.datosDocumentoForm.get('destinatario');
    if (destinatarioCtrl) {
      destinatarioCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(value => {
          if (!this.esConsulta && value && value.id === Sociedades.LDC) {
            this.fcService.enableControl('datosDocumento.sedeDestino');
          } else {
            this.fcService.disableControl('datosDocumento.sedeDestino');
            if (!this.esConsulta) {
              this.fcService.setValue('datosDocumento.sedeDestino', '');
            }
          }
        });
    }
  }

  onStockDisponible(stock: ConsultarStockDataView) {
    if (stock && stock.cantidadEstimada) {
      this.fcService.setValue('datosDocumento.cantidadEstimada', stock.cantidadEstimada);
    }
  }
  deshabilitaPorRegimen() {
    if (this.esCartaPorteElectronica || this.esConsulta) {
      this.fcService.setValue('datosDocumento.numeroCEE', '', {onlySelf: true}, true);
      this.fcService.disableControl('datosDocumento.numeroCEE');
    } else {
      this.fcService.enableControl('datosDocumento.numeroCEE');
    }
  }
}
