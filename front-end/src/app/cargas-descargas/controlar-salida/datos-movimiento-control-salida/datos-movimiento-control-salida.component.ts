import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientoControlSalida } from '../../../shared/data-models/movimiento-control-salida';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { Caracteristicas, Actividades, TiposProducto } from '../../../shared/enums/enums';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { TextAreaConEtiquetaComponent } from '../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutocompletePlantaComponent } from '../../../../app/shared/autocomplete-planta/autocomplete-planta.component';

@Component({
  selector: 'yrd-datos-movimiento-control-salida',
  templateUrl: './datos-movimiento-control-salida.component.html',
  styleUrls: ['./datos-movimiento-control-salida.component.css']
})

export class DatosMovimientoControlSalidaComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('observaciones') observaciones: TextAreaConEtiquetaComponent;
  @ViewChild('planta') planta: AutocompletePlantaComponent;
  @Input() datosMovimientoForm: FormGroup;
  @Input() movimiento: MovimientoControlSalida;
  @Input() circuito: Circuito;
  @Input() esCarga: Boolean;
  @Input() esCartaPorte = false;
  @Input() tipoDocPorteRegex: Array<any>;
  @Input() confirmarImpresionRemito = false;
  @Input() esAutomatica = false;
  @Input() esRegimenElectronico = false;
  @Input() maximo = 12;
  @Input() cuit = 0;
  regimenSeteado = false;
  banderaCircuito = false;
  esCereal = false;

  private readonly fcService: FormComponentService;
  private onDestroy = new Subject();

  readonly validationMessagesRequeridoMayorACero = {
    required: Resources.Messages.ElCampoXEsRequerido.format(''),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format('', '0')
  };

  readonly validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };

  readonly validationMessagesNumeroCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CTG),
    pattern: Resources.Messages.ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero,
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CTG, '0')
  };

  readonly validationMessagesNumeroCOT = {
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.COT, '0')
  };

  readonly validationMessagesCorredorVendedor = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  readonly validationMessagesPlanta = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  constructor(private readonly popupService: PopupService,
    private readonly parametrosTerminalService: ParametrosTerminalService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit(): void {
    this.fcService.initialize(this.datosMovimientoForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['movimiento'] && changes['movimiento'].currentValue) {
        this.completeDatosMovimientoForm();
      }
      if (changes['circuito'] && !changes['circuito'].currentValue) {
        this.banderaCircuito = true;
      }
      if (changes['esRegimenElectronico'] && !changes['esRegimenElectronico'].firstChange) {
        this.regimenSeteado = true;
      }
      if (this.regimenSeteado && this.banderaCircuito) {
        this.setEnableCTG();
      }
    }
    if (this.esCarga && (this.confirmarImpresionRemito || this.esCartaPorte)) {
      this.fcService.enableControl('observaciones');
    } else {
      this.fcService.disableControl('observaciones');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private completeDatosMovimientoForm(): void {
    this.esCereal = this.movimiento.tipoProducto.id ===  TiposProducto.Cereal;

    this.fcService.setValue('tipoDocumentoPorte', this.movimiento.tipoDocumentoPorte.descripcion, { onlySelf: true });
    this.fcService.setValue('nroDocumentoPorte', this.movimiento.nroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('ctg', this.movimiento.numeroCTG, { onlySelf: true });
    this.fcService.setValue('producto', this.movimiento.producto.descripcion, { onlySelf: true });
    this.fcService.setValue('estado', this.movimiento.estado.descripcion, { onlySelf: true });
    this.fcService.setValue('estadoCupo', this.movimiento.estadoCupo, { onlySelf: true });
    this.fcService.setValue('nroCupo', this.movimiento.nroCupo, { onlySelf: true });
    this.fcService.setValue('titular', this.movimiento.titularRazonSocial, { onlySelf: true });
    this.fcService.setValue('vendedor', this.movimiento.vendedorRazonSocial, { onlySelf: true });
    this.fcService.setValue('entregador', this.movimiento.entregadorRazonSocial, { onlySelf: true });
    this.fcService.setValue('patente', this.movimiento.patenteCamion, { onlySelf: true });
    this.fcService.setValue('turnoPlaya', this.movimiento.turno, { onlySelf: true });
    this.fcService.setValue('fechaHoraEntrada', this.movimiento.fechaEntrada, { onlySelf: true });
    this.fcService.setValue('tipoMovimiento', this.movimiento.tipoMovimiento.descripcion, { onlySelf: true });
    this.fcService.setValue('tipoTransporte', this.movimiento.tipoTransporte, { onlySelf: true });
    this.fcService.setValue('numeroVagon', this.movimiento.numeroVagon, { onlySelf: true });
    this.fcService.setValue('ordenCarga', this.movimiento.ordenCarga, { onlySelf: true });
    this.fcService.setValue('numeroViaje', this.movimiento.numeroViaje, { onlySelf: true });
    this.fcService.setValue('establecimientoDestinoRazonSocial', this.movimiento.establecimientoDestinoRazonSocial, { onlySelf: true });
    this.fcService.setValue('destinatarioRazonSocial', this.movimiento.destinatarioRazonSocial, { onlySelf: true });

    this.esAutomatica ? this.fcService.disableControl('numeroDocumentoPorte') : this.fcService.enableControl('numeroDocumentoPorte');

    if (this.movimiento.numeroTramiteCOT) {
      this.fcService.setValue('numeroTramiteCOT', this.movimiento.numeroTramiteCOT, { onlySelf: false });
    }
    if (this.movimiento.numeroCOT) {
      this.fcService.setValue('numeroCOT', this.movimiento.numeroCOT, { onlySelf: true });
    }
    if (this.movimiento.numeroCTG) {
      this.fcService.setValue('numeroCTG', this.movimiento.numeroCTG, { onlySelf: true });
    }
    this.esAutomatica ? this.fcService.disableControl('numeroCTG') : this.fcService.enableControl('numeroCTG');

    if (!this.esCereal) {  this.fcService.disableControl('numeroCTG');  }

    this.gestionaCot(this.movimiento.producto.id);
  }

  public disabledPlanta(plantaEsRequerido: boolean) {
    const plantaCtrl = this.datosMovimientoForm.controls.planta;
    if (plantaCtrl) { plantaEsRequerido ? plantaCtrl.enable() : plantaCtrl.disable(); }
  }

  private setEnableCTG(): void {
    if (this.esCarga
      && this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.SolicitarCTG], Actividades.RegistrarSalidaConCarga)
      && this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaConCarga)) {
      this.esRegimenElectronico && this.esAutomatica ? this.datosMovimientoForm.controls.numeroCTG.disable() :
                                                       this.datosMovimientoForm.controls.numeroCTG.enable();
      this.datosMovimientoForm.controls.codigoCupo.enable();
    }
  }

  private gestionaCot(idProducto: number): void {
    this.parametrosTerminalService.getGestionaCot(idProducto)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((gestionaCot: boolean) => {
        this.setEnableCOT(gestionaCot);
      });
  }

  private setEnableCOT(gestionaCot: boolean): void {
    if (this.esCarga && gestionaCot
      && this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaConCarga)) {
      this.datosMovimientoForm.controls.numeroCOT.enable();
    }
  }

}
