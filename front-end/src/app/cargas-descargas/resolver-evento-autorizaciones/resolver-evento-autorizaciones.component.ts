import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { BA_ResolverEventosAutorizaORechazaCamionDataView } from '../../shared/data-models/resolver-eventos-autoriza-rechaza';
import { ResolverEventoAutorizacionesService } from './resolver-evento-autorizaciones.service';
import { ActivatedRoute } from '@angular/router';
import { ResolverEventoAutorizacionesCommand } from '../../shared/data-models/commands/cargas-descargas/resolver-evento-autorizaciones-command';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Movimiento } from '../../shared/data-models/movimiento';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-resolver-evento-autorizaciones',
  templateUrl: './resolver-evento-autorizaciones.component.html',
  styleUrls: ['./resolver-evento-autorizaciones.component.css']
})
export class ResolverEventoAutorizacionesComponent implements OnInit {
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  rolesAAutorizar: EntityWithDescription[][];
  @Output() cerrarPopUp = new EventEmitter();
  @Input() command: ResolverEventoAutorizacionesCommand;
  esAutomatico: boolean;
  esEntrada: boolean;
  idAccion: number;
  movimiento: Movimiento;
  pathArchestra: string;
  idBitacora: number;
  form: FormGroup;
  dataView: BA_ResolverEventosAutorizaORechazaCamionDataView;
  motivoNoDescargaId: number;
  constructor(private readonly fb: FormBuilder,
    private readonly fcService: FormComponentService,
    private readonly service: ResolverEventoAutorizacionesService,
    private readonly popupService: PopupService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
    ) { }

    ngOnInit() {
      this.getParameters();
      this.createForm();
      this.getInfo();
    }
    private getParameters(): void {
      const path = this.route.snapshot.queryParamMap.get('pathArchestra');
      const idBit = this.route.snapshot.queryParamMap.get('idBitacora');
      this.pathArchestra = path != null ? path : '';
      // tslint:disable-next-line: radix
      this.idBitacora = idBit != null ? parseInt(idBit, 10) : 0;
    }
    private getInfo(): void {
      this.service.get(this.command.pathArchestra)
      .subscribe((datos: BA_ResolverEventosAutorizaORechazaCamionDataView) => {
        this.service.getRoles(datos.motivoNoDescargaId, datos.idTipoMovimiento, datos.idTipoTransporte, datos.idCircuito, false)
        .subscribe((datos2: any) => {
          this.mapearRoles(datos2);
        });
        this.llenarCampos(datos);
        this.calculateDifferences();
      });
    }
  createForm() {
    this.form = this.fb.group({
      planta: [{ value: '', disabled: true }],
      nombreBalanza: { value: '', disabled: true },
      tipoDeDocPorte: { value: '', disabled: true },
      nroDeDocPorte: { value: '', disabled: true },
      pesoCapturado: { value: '', disabled: true },
      producto: { value: '', disabled: true },
      patenteCapturada: { value: '', disabled: true },
      tarjeta: { value: '', disabled: true },
      estado: { value: '', disabled: true },
      titular: { value: '', disabled: true },
      vendedor: { value: '', disabled: true },
      intermediario: { value: '', disabled: true },
      remitenteCom: { value: '', disabled: true },
      corredorComprador: { value: '', disabled: true },
      corredorVendedor: { value: '', disabled: true },
      destinatario: { value: '', disabled: true },
      entregador: { value: '', disabled: true },
      motivoNoDescarga: { value: '', disabled: true },
      observacion: { value: ''},
      kgPesoBrutoDocumento: { value: '', disabled: true },
      datosPesaje: this.fb.group({
        idMovimiento: { value: ''},
        brutoDocPorte: { value: '', disabled: true },
        taraDocPorte: { value: '', disabled: true },
        netoDocPorte: { value: '', disabled: true },
        kilosBruto: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(2147483647)])
        ],
        kilosTara: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(2147483647)])
        ],
        netoBalanza: { value: '', disabled: true },
        brutoDiferencia: { value: '', disabled: true },
        taraDiferencia: { value: '', disabled: true },
        netoDiferencia: [{ value: '', disabled: true }],
        brutoEsRepesaje: { value: false, disabled: true },
        taraEsRepesaje: { value: false, disabled: true },
        entradaManualAutomatico: { value: '', disabled: true },
        salidaManualAutomatico: { value: '', disabled: true },
        pesosTomados: this.fb.array([])
      }),
    });
    this.fcService.initialize(this.form);
  }
  private calculateDifferences() {

    const kilosBruto = this.form.get('datosPesaje.kilosBruto');
    const brutoDocPorte = this.form.get('datosPesaje.brutoDocPorte');
    const kilosNeto = this.form.get('datosPesaje.netoBalanza');
    const netoDocPorte = this.form.get('datosPesaje.netoDocPorte');
    const kilosTara = this.form.get('datosPesaje.kilosTara');
    const taraDocPorte = this.form.get('datosPesaje.taraDocPorte');
    if (kilosBruto && brutoDocPorte) {
      // tslint:disable-next-line: radix
      const bruto = parseInt(kilosBruto.value);
      // tslint:disable-next-line: radix
      const brutoDoc = parseInt(brutoDocPorte.value);
      this.fcService.setValue('datosPesaje.brutoDiferencia', Math.abs(brutoDoc - bruto), { onlySelf: true });
    }
    if (kilosNeto && netoDocPorte) {
      // tslint:disable-next-line: radix
      const neto = parseInt(kilosNeto.value);
      // tslint:disable-next-line: radix
      const netoDoc = parseInt(netoDocPorte.value);
      this.fcService.setValue('datosPesaje.netoDiferencia', Math.abs(netoDoc - neto), { onlySelf: true });
    }
    if (kilosTara && taraDocPorte) {
      // tslint:disable-next-line: radix
      const tara = parseInt(kilosTara.value);
      // tslint:disable-next-line: radix
      const taraDoc = parseInt(taraDocPorte.value);
      this.fcService.setValue('datosPesaje.taraDiferencia', Math.abs(taraDoc - tara), { onlySelf: true });
    }
    if (kilosBruto && kilosTara) {
      // tslint:disable-next-line: radix
      const bruto = parseInt(kilosBruto.value);
      // tslint:disable-next-line: radix
      const tara = parseInt(kilosTara.value);
      this.fcService.setValue('datosPesaje.netoBalanza', Math.abs(bruto - tara), { onlySelf: true });
    }
    if (netoDocPorte && kilosNeto) {
      // tslint:disable-next-line: radix
      const neto = parseInt(kilosNeto.value);
      // tslint:disable-next-line: radix
      const netoDoc = parseInt(netoDocPorte.value);
      this.fcService.setValue('datosPesaje.netoDiferencia', Math.abs(netoDoc - neto), { onlySelf: true });
    }
  }

  autorizarClick(): void {
    this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
  }

  rechazarClick(): void {
    const motivo = this.motivoNoDescargaId;
    this.command.decision = false;
    this.command.motivoNoDescargaId = motivo;

    this.service.resolver(this.command).subscribe(() => {
      this.popupService.success('Rechazado');
      this.cerrarPopUp.emit();
    });
  }

  onAutorizacionCompletada() {
    const motivo = this.motivoNoDescargaId;
    this.command.decision = true;
    this.command.motivoNoDescargaId = motivo;

    this.service.resolver(this.command).subscribe(() => {
      this.popupService.success('Autorizado');
      this.cerrarPopUp.emit();
    });
  }

  cancelarClick(): void {
    this.navigationService.navigateBack();
  }

  private llenarCampos(datos: BA_ResolverEventosAutorizaORechazaCamionDataView) {

    this.fcService.setValue('planta', datos.planta, { onlySelf: true });
    this.fcService.setValue('nombreBalanza', datos.nombreBalanza, { onlySelf: true });
    this.fcService.setValue('tipoDeDocPorte', datos.tipoDeDocPorte, { onlySelf: true });
    this.fcService.setValue('nroDeDocPorte', datos.nroDeDocPorte, { onlySelf: true });
    this.fcService.setValue('producto', datos.producto, { onlySelf: true });
    this.fcService.setValue('patenteCapturada', datos.patenteCapturada, { onlySelf: true });
    this.fcService.setValue('tarjeta', datos.tarjeta, { onlySelf: true });
    this.fcService.setValue('estado', datos.estado, { onlySelf: true });
    this.fcService.setValue('titular', datos.titular, { onlySelf: true });
    this.fcService.setValue('vendedor', datos.vendedor, { onlySelf: true });
    this.fcService.setValue('intermediario', datos.intermediario, { onlySelf: true });
    this.fcService.setValue('remitenteCom', datos.remitenteCom, { onlySelf: true });
    this.fcService.setValue('corredorComprador', datos.corredorComprador, { onlySelf: true });
    this.fcService.setValue('corredorVendedor', datos.corredorVendedor, { onlySelf: true });
    this.fcService.setValue('destinatario', datos.destinatario, { onlySelf: true });
    this.fcService.setValue('entregador', datos.entregador, { onlySelf: true });
    this.fcService.setValue('motivoNoDescarga', datos.motivoNoDescarga, { onlySelf: true });
    this.fcService.setValue('kgPesoBrutoDocumento', datos.kgPesoBrutoDocumento, { onlySelf: true });
    this.fcService.setValue('observacion', '', { onlySelf: true });
    this.fcService.setValue('datosPesaje.netoDocPorte', datos.kgPesoNetoDocumento, { onlySelf: true });
    this.fcService.setValue(`datosPesaje.taraDocPorte`, datos.kgPesoTaraDocumento, { onlySelf: true });
    this.fcService.setValue(`datosPesaje.kilosBruto`, datos.kgPesoBruto, { onlySelf: false });
    this.fcService.setValue(`datosPesaje.brutoDocPorte`, datos.kgPesoBrutoDocumento, { onlySelf: false });
    this.fcService.setValue(`datosPesaje.kilosTara`, datos.kgPesoTara, { onlySelf: false });
    this.motivoNoDescargaId = datos.motivoNoDescargaId;
  }

  private mapearRoles(roles: any[]) {
    const rolesEntrada: EntityWithDescription[] = [];
    const rolesSalida: EntityWithDescription[] = [];
    for (const key in roles) {
      if (roles.hasOwnProperty(key)) {
        if (roles[key].orden === 1) {
          rolesEntrada.push(new EntityWithDescription(+key, roles[key].nombre));
        } else {
          rolesSalida.push(new EntityWithDescription(+key, roles[key].nombre));
        }
      }
    }

    this.rolesAAutorizar = [];
    if (rolesSalida.length) {
      this.rolesAAutorizar.push(rolesSalida);
    }
    if (rolesEntrada.length) {
      this.rolesAAutorizar.push(rolesEntrada);
    }
  }
}
