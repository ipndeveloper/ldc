import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../../app/core/services/popupService/popup.service';
import { ResolverEventoPlataformaDescargaCommand } from '../../../app/shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-descarga-command';
import { Resources } from '../../../../src/locale/artifacts/resources';
import { FormComponentService } from '../../../app/core/services/formComponent/formComponent.service';
import { ResolverEventoPlataformaDescargaDataView } from '../../../app/shared/data-models/resolver-evento-plataforma-descarga-data-view';
import { MovimientoPesaje } from '../registrar-peso/movimiento-pesaje';
import { ResolverPlataformaDescargaService } from './resolver-plataforma-descarga.service';

@Component({
  selector: 'yrd-resolver-plataforma-descarga',
  templateUrl: './resolver-plataforma-descarga.component.html',
  styleUrls: ['./resolver-plataforma-descarga.component.css']
})
export class ResolverPlataformaDescargaComponent implements OnInit {

  @Input() command: ResolverEventoPlataformaDescargaCommand;
  @Output() cerrarPopUp = new EventEmitter();
  form: FormGroup;
  movimiento: MovimientoPesaje;
  disableButtons = true;
  esDescarga: boolean;
  pathArchestra: string;

  validationMessagesCondicionManipuleo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(this.lugarCargaDescarga),
    stockInsuficiente: Resources.Messages.StockInsuficiente
  };

  get esCarga(): boolean {
    return this.esDescarga != null ? !this.esDescarga : false;
  }

  get lugarCargaDescarga(): string {
    return this.esDescarga ? Resources.Labels.LugarDescarga
                           : Resources.Labels.LugarCarga;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ResolverPlataformaDescargaService,
    private readonly fcService: FormComponentService,
    private readonly popupService: PopupService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getInformation();
  }

  createForm() {
    this.form = this.fb.group({
      lugarDescargaCarga:  [{value: '', disabled: true}, Validators.required],
      planta: { value: '', disabled: true },
      nombreBalanza: { value: '', disabled: true },
      pesoCapturado: { value: '', disabled: true },
      terminal: { value: '', disabled: true },
      tipoMovimiento: { value: '', disabled: true },
      transporte: { value: '', disabled: true },
      tipoProducto: { value: '', disabled: true },
      estado: { value: '', disabled: true },
      tipoDocPorte: { value: '', disabled: true },
      docPorte: { value: '', disabled: true },
      producto: { value: '', disabled: true },
      cosecha: { value: '', disabled: true },
      estadoCupo: { value: '', disabled: true },
      turnoPlaya: { value: '', disabled: true },
      ordenCarga: { value: '', disabled: true },
      cantEstimada: { value: '', disabled: true },
      humedad: { value: '', disabled: true },
      proteina: { value: '', disabled: true },
      grado: { value: '', disabled: true },

    });
    this.fcService.initialize(this.form);
  }

  getInformation() {
    this.service.get(this.command.pathArchestra).subscribe(datos => {
      this.llenarCampos(datos);
      this.movimiento = datos.movimientoPesajeDataView;
      this.disableButtons = false;
      this.esDescarga = datos.movimientoPesajeDataView.esDescarga;
    });
  }

  llenarCampos(datos: ResolverEventoPlataformaDescargaDataView) {
    this.fcService.setValue('planta', datos.planta, { onlySelf: true });
    this.fcService.setValue('pesoCapturado', datos.pesoCapturado, { onlySelf: true });
    this.fcService.setValue('nombreBalanza', datos.nombreBalanza, { onlySelf: true });
    this.fcService.setValue('terminal', datos.terminal, { onlySelf: true });
    this.fcService.setValue('tipoMovimiento', datos.movimientoPesajeDataView.esDescarga ? 'Descarga' : 'Carga',  { onlySelf: true });
    this.fcService.setValue('transporte', datos.transporte, { onlySelf: true });
    this.fcService.setValue('tipoProducto', datos.tipoProducto, { onlySelf: true });
    this.fcService.setValue('estado', datos.movimientoPesajeDataView.estado, { onlySelf: true });
    this.fcService.setValue('tipoDocPorte', datos.movimientoPesajeDataView.tipoDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('docPorte', datos.movimientoPesajeDataView.nroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('producto', datos.movimientoPesajeDataView.producto ? datos.movimientoPesajeDataView.producto.descripcion : '',
                              { onlySelf: true });
    this.fcService.setValue('cosecha', datos.movimientoPesajeDataView.cosecha, { onlySelf: true });
    this.fcService.setValue('estadoCupo', datos.movimientoPesajeDataView.estadoCupo, { onlySelf: true });
    this.fcService.setValue('turnoPlaya', datos.movimientoPesajeDataView.turno, { onlySelf: true });
    this.fcService.setValue('ordenCarga', datos.movimientoPesajeDataView.ordenCarga, { onlySelf: true });
    this.fcService.setValue('cantEstimada', datos.movimientoPesajeDataView.cantidadEstimada, { onlySelf: true });
    this.fcService.setValue('humedad', datos.movimientoPesajeDataView.humedad, { onlySelf: true });
    this.fcService.setValue('proteina', datos.movimientoPesajeDataView.proteina, { onlySelf: true });
    this.fcService.setValue('grado', datos.movimientoPesajeDataView.grado, { onlySelf: true });
    this.fcService.setValue('lugarDescargaCarga', { id: datos.movimientoPesajeDataView.idCondicionManipuleo });
  }

  aprobarRechazar(aprobado: boolean) {
    const command = this.getCommand(aprobado);

    this.service.aprobar(command).subscribe(() => {
      if (aprobado) {
        this.popupService.success('Se envió con éxito los datos para aprobar la plataforma de descarga');
      } else {
        this.popupService.success('Se envió con éxito los datos para rechazar');
      }
      this.cerrarPopUp.emit();
    });
  }
  cancelar() {
    this.cerrarPopUp.emit();
  }

  getCommand(aprobado: boolean): ResolverEventoPlataformaDescargaCommand {
    this.command.aprobado = aprobado;
    this.command.idMovimiento = this.movimiento.id;

    return this.command;
  }
}
