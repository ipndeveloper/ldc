import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MovimientoCargaCamionVarios } from '../../../shared/data-models/movimiento-carga';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { TiposProducto, Sociedades } from '../../../shared/enums/enums';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { ConsultarStockDataView } from '../../../shared/data-models/consulta-stock-data-view';
import { AuthService } from '../../../core/services/session/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'yrd-datos-documento-controlar-carga-camion-insumo-vario',
  templateUrl: './datos-documento-controlar-carga-camion-insumo-vario.component.html',
  styleUrls: ['./datos-documento-controlar-carga-camion-insumo-vario.component.css']
})
export class DatosDocumentoControlarCargaCamionInsumoVarioComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() movimientoCarga: MovimientoCargaCamionVarios;
  @Input() esConsulta = false;
  @Input() esFueraCircuito: boolean;
  @Input() mostrarEncabezado = true;
  @Input() documentoPorte: AbstractControl;
  @Input() tipoProducto: TipoProducto;
  @Input() esModificacionOConsultaMovimiento: boolean;
  @Input() idViaje: number;
  protected onDestroy = new Subject();

  readonly esAcopio: boolean;

  datosDocumentoForm: FormGroup;
  marcagestionaCot: boolean;

  readonly validationMessagesNumeroCEE = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroCEE),
    minlength: Resources.Messages.ElCeeIngresadoDebeTener14DigitosYSerDistintoDeCero
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

  get esMovimientoInsumo(): boolean {
    return this.tipoProducto ? (this.tipoProducto.id === TiposProducto.Insumos ||
                                this.tipoProducto.id === TiposProducto.InsumosLiquidos) : false;
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
              protected readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.esAcopio = userContext.terminal.puerto.esAcopio;
    }
}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit() {
    this.subscribirseCambiosDocumento();
  }

  ngOnChanges(): void {
    if (this.movimientoCarga && this.tipoProducto) {
      this.loadMovimiento();
      this.habilitarCamposInsumos();
      this.habilitarSedeDestino();
    }
  }

  protected subscribirseCambiosDocumento() {
    this.subscribeCambioDestinatario();
  }

  private habilitarCamposInsumos(): void {
    if (this.esMovimientoInsumo) {
      const lugarCarga = this.fcService.getControl('datosDocumento.lugarCarga');

      if (lugarCarga && !this.esConsulta) {
        lugarCarga.setValidators(Validators.required);
        lugarCarga.updateValueAndValidity();
      }
    }
  }

  createForm(): void {
    this.datosDocumentoForm = this.fb.group({
      tarjeta: [{ value: '', disabled: true }],
      producto: [{ value: undefined, disabled: true }, Validators.required],
      ordenCarga: [{ value: '', disabled: true }],
      numeroViaje: [{ value: '', disabled: true }],
      patenteCamion: [{ value: '', disabled: true }],
      patenteAcoplado: [ { value: '', disabled: true }],
      estadoViaje: [{ value: '', disabled: true }],
      remitenteComercial: [{ value: '', disabled: true }],
      estadoCabecera: [{ value: '', disabled: true }],
      intermediario: [{ value: '', disabled: true }],
      numeroContrato: [{ value: '', disabled: true }],
      corredor: [{ value: '', disabled: true }],
      finalidad: [{value: '', disabled: true}, Validators.required],
      transportista: [{ value: '', disabled: true }],
      sedeOrigen: [{ value: '', disabled: true }, Validators.required],
      chofer: [{ value: undefined, disabled: true }],
      sedeDestino: [{ value: '', disabled: true }, Validators.required],
      destinatario: [{value: '', disabled: true}],
      cantidadEstimada: [{ value: '', disabled: true }],
      numeroCEE: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(14), Validators.required])],
      numeroTramiteCOT: [{ value: '', disabled: true }],
      numeroCOT: [{ value: '', disabled: true }],
      datosEntrega: this.fb.group({
        calle: [{ value: '', disabled: true }],
        numero: [{ value: '', disabled: true }],
        localidad: [{ value: '', disabled: true }],
        codigoPostal: [{ value: '', disabled: true }],
        provincia: [{ value: '', disabled: true }]
      }),
      usuarioAlta: [{ value: '', disabled: true }],
      observaciones: [{ value: '', disabled: false }, Validators.maxLength(250)],
      kilosNeto: [{ value: '', disabled: true }],
      kilosTara: [{ value: '', disabled: true }],
      kilosBruto: [{ value: '', disabled: true }],
      establecimientoDestino: [{ value: '', disabled: true }],
      tarifaFleteReferencia: [{ value: '', disabled: true }],
      tarifaFletePorTn: [{ value: '', disabled: true }],
      lugarCarga: [{ value: '', disabled: true }],
      identificacionDestinacion: { value: '', disabled: true }
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

  protected loadMovimiento(): void {
    this.fcService.setValue('datosDocumento.producto', this.movimientoCarga.producto, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.ordenCarga', this.movimientoCarga.ordenCarga, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.numeroViaje', this.movimientoCarga.numeroViaje, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.patenteCamion', this.movimientoCarga.patenteCamion.toUpperCase(), {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.patenteAcoplado', this.movimientoCarga.patenteAcoplado.toUpperCase(), {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.estadoViaje', this.movimientoCarga.estadoViaje, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.remitenteComercial', this.movimientoCarga.remitenteComercial, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.estadoCabecera', this.movimientoCarga.estadoCabecera, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.intermediario', this.movimientoCarga.intermediario, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.numeroContrato', this.movimientoCarga.numeroContrato, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.corredor', this.movimientoCarga.corredorComprador, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.finalidad', this.movimientoCarga.finalidad.descripcion, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.transportista', this.movimientoCarga.transportista, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.sedeOrigen',
                            this.movimientoCarga.sedeVendedor, {onlySelf: true});
    this.fcService.setValue('datosDocumento.chofer', this.movimientoCarga.chofer, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.destinatario', this.movimientoCarga.destinatario, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.cantidadEstimada', this.movimientoCarga.cantidadEstimada, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.numeroCEE', this.movimientoCarga.codigoEmisionElectronica, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue('datosDocumento.datosEntrega.calle', this.movimientoCarga.calle, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.datosEntrega.numero', this.movimientoCarga.numero, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.datosEntrega.localidad', this.movimientoCarga.localidad, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.datosEntrega.codigoPostal', this.movimientoCarga.codigoPostal, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.datosEntrega.provincia', this.movimientoCarga.provincia, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.usuarioAlta', this.movimientoCarga.usuarioAltaCarga, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.observaciones', this.movimientoCarga.observaciones, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue('datosDocumento.numeroTramiteCOT', this.movimientoCarga.numeroTramiteOperacionTraslado, {onlySelf: true});
    this.fcService.setValue('datosDocumento.tarjeta', this.movimientoCarga.numeroTarjeta, {onlySelf: true}, true);
    this.fcService.setValue('datosDocumento.kilosNeto', this.movimientoCarga.kgNeto, {onlySelf: true});
    this.fcService.setValue('datosDocumento.kilosTara', this.movimientoCarga.kgTara, {onlySelf: true});
    this.fcService.setValue('datosDocumento.kilosBruto', this.movimientoCarga.kgBruto, {onlySelf: true});
    this.fcService.setValue('datosDocumento.establecimientoDestino', this.movimientoCarga.establecimientoDestino, {onlySelf: true});
    this.fcService.setValue('datosDocumento.tarifaFletePorTn', this.movimientoCarga.tarifaFletePorTn, {onlySelf: true});
    this.fcService.setValue('datosDocumento.tarifaFleteReferencia', this.movimientoCarga.tarifaFleteReferencia, {onlySelf: true});
    this.fcService.setValue('datosDocumento.identificacionDestinacion', this.movimientoCarga.identificacionDestinacion);
    this.fcService.setValue('datosDocumento.lugarCarga',
                            this.movimientoCarga.condicionManipuleo, {onlySelf: true}, this.esConsulta || this.esFueraDeCircuito);
    this.fcService.setValue('datosDocumento.numeroCOT',
                            this.movimientoCarga.codigoOperacionTraslado, {onlySelf: true});

    this.fcService.setValue('datosDocumento.sedeDestino',
    this.movimientoCarga.sedeDestinatario, {onlySelf: true}, !(this.movimientoCarga.destinatario.id === Sociedades.LDC));

    this.gestionaCot(this.movimientoCarga.producto.id);
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
      .subscribe((gestionaCot: boolean) => {
        this.loadGestionaCot(gestionaCot);
      });
  }

  protected habilitarSedeDestino (): void {
    const destinatario = this.fcService.getValue('datosDocumento.destinatario');

    if (!this.esConsulta &&
        destinatario &&
        destinatario === Sociedades.LDC) {
      this.fcService.enableControl('datosDocumento.sedeDestino');
    } else {
      this.fcService.disableControl('datosDocumento.sedeDestino');
    }
  }

  onStockDisponible(stock: ConsultarStockDataView) {
    if (stock && stock.cantidadEstimada) {
      this.fcService.setValue('datosDocumento.cantidadEstimada', stock.cantidadEstimada);
    }
  }
}
