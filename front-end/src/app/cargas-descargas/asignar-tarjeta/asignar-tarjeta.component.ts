import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Collection } from '../../core/models/collection';
import { DesplegableTipoDocumentoPorteComponent } from '../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { Resources } from '../../../locale/artifacts/resources';
import { AsignarTarjetaService } from '../shared/modals/modal-asignar-tarjeta/asignar-tarjeta.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AsignarTarjetaPorDocumentoPorteYPatenteCommand } from '../../shared/data-models/commands/cargas-descargas/asignar-tarjeta-command';
import { LecturaTarjetaComponent } from '../shared/lectura-tarjeta/lectura-tarjeta.component';
import { TiposTransporte, ComportamientoAfip } from '../../shared/enums/enums';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';


@Component({
  selector: 'yrd-asignar-tarjeta',
  templateUrl: './asignar-tarjeta.component.html',
  styleUrls: ['./asignar-tarjeta.component.css']
})
export class AsignarTarjetaComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tipoDocumentoPorte') tipoDocumentoPorte: DesplegableTipoDocumentoPorteComponent;
  @ViewChild('lecturaTarjeta') lecturaTarjeta: LecturaTarjetaComponent;

  form: FormGroup;
  tipoTransporteCamion = { id: TiposTransporte.Camion };
  validationMessagesTipoDocumentoPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte)
  };
  validationMessagesNumeroDocumentoPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte)
  };
  validationMessagesPatente = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Patente)
  };
  private onDestroy = new Subject();

  get cssClassRowLecturaTarjeta(): string {
    if (this.lecturaTarjeta) {
      return this.lecturaTarjeta.lecturaEnModoAutomatico ? 'justify-content-end' : '';
    }
    return '';
  }

  get validateDocPorteYPatente(): Observable<Boolean> {
    return this.service.validarDocPorteYPatente(this.formValueTipoDocumentoPorte,
                                                this.formValueDocumentoPorte,
                                                this.formValuePatente,
                                                this.formValueCtg)
      .pipe(takeUntil(this.onDestroy),
        map((valido: boolean) => {
        if (!this.formValueTipoDocumentoPorte || !this.formValueDocumentoPorte || ! this.formValuePatente) {
          this.validarForm();
        } else if (!valido) {
          this.popupService.error(Resources.Messages.ElDocumentoDePorteNoCoincideConLaPatente);
        }
        return valido;
      }));
  }

  get formValid(): boolean {
    if (this.form) {
      return this.fcService.isValidForm();
    }
    return false;
  }

  get formValueTipoDocumentoPorte() {
    if (this.form) {
      return this.fcService.getValue('tipoDocumentoPorte');
    }
    return null;
  }

  get formValueDocumentoPorte() {
    if (this.form) {
      return this.fcService.getValue('numeroDocumentoPorte');
    }
    return null;
  }

  get formValueCtg() {
    if (this.form) {
      return this.fcService.getValue('ctg');
    }
    return null;
  }

  get formValuePatente() {
    if (this.form) {
      return this.fcService.getValue('patente');
    }
    return null;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly service: AsignarTarjetaService,
              private readonly popupService: PopupService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.suscribirseCambioTipoDocumentoPorte();
  }

  ngAfterViewInit(): void {
    this.tipoDocumentoPorte.setFocus();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private createForm(): void {
    this.form = this.fb.group({
      tipoDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
      numeroDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
      ctg: { value: '', disabled: false },
      patente: [{ value: '', disabled: false }, Validators.required],
      tarjeta: [{ value: '', disabled: false }, Validators.required]
    });
    this.fcService.initialize(this.form);
  }

  onTarjetaLeida(): void {
    this.onAsignarTarjeta();
  }

  onAsignarTarjeta(): void {
    if (this.fcService.isValidForm()) {
      const command = this.mapControlsToCommand();
      this.service.asignarTarjetaPorDocumentoPorteYPatente(command)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(_ => {
          this.popupService.success(Resources.Messages.LaTarjetaFueAsignada);
          this.fcService.resetForm();
          this.tipoDocumentoPorte.setFocus();
        });
    } else {
      // se previene que salte el mensaje de "Verifique los datos" cuando la tarjeta es invalida
      const tarjeta = this.fcService.getValue('tarjeta');
      const esModoAutomaticoYSeCompletaronLosCamposPeroTarjetaInvalida = this.lecturaTarjeta.lecturaEnModoAutomatico &&
        !tarjeta && this.formValueTipoDocumentoPorte && this.formValueDocumentoPorte && this.formValuePatente;

      if (!esModoAutomaticoYSeCompletaronLosCamposPeroTarjetaInvalida) {
        this.validarForm();
      }
    }
  }

  private validarForm(): void {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);
  }

  suscribirseCambioTipoDocumentoPorte() {
    const tipoDocumentoPorte = this.form.get('tipoDocumentoPorte');
    if (tipoDocumentoPorte) {
      tipoDocumentoPorte.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((tipo: TipoDocumentoPorte) => {
        if (tipo && tipo.mascara) {
          this.consultarRegimenAfip(tipoDocumentoPorte.value);
        }
      });

    }
  }

  consultarRegimenAfip(tipoDocumento: any) {
    const ctg = this.form.get('ctg');
    const numeroDocumentoPorte = this.form.get('numeroDocumentoPorte');
    if (ctg && numeroDocumentoPorte) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined)) {
          ctg.enable();
          numeroDocumentoPorte.clearValidators();
          numeroDocumentoPorte.updateValueAndValidity();
        } else {
          ctg.disable();
          numeroDocumentoPorte.setValidators(Validators.required);
        }
        ctg.reset();
      });
    }
  }

  private mapControlsToCommand(): AsignarTarjetaPorDocumentoPorteYPatenteCommand {
    const command = new AsignarTarjetaPorDocumentoPorteYPatenteCommand();
    command.idTipoDocumentoPorte = this.formValueTipoDocumentoPorte;
    command.numeroDocumentoPorte = this.formValueDocumentoPorte;
    command.ctg = this.formValueCtg;
    command.patente = this.formValuePatente;
    command.numeroTarjeta = this.fcService.getValue('tarjeta');
    return command;
  }
}
