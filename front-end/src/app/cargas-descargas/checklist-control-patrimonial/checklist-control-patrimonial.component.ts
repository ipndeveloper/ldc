import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { Subscription } from 'rxjs';
import { ChecklistControlPatrimonialService } from './checklist-control-patrimonial.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ChecklistControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/checklist-control-patrimonial-command';
import { ChecklistControlPatrimonial } from '../../shared/data-models/checklist-control-patrimonial';
import { DatosChecklistControlPatrimonialComponent } from './datos-checklist-control-patrimonial/datos-checklist-control-patrimonial.component';
import { ListaChecklistControlPatrimonialComponent } from './lista-checklist-control-patrimonial/lista-checklist-control-patrimonial.component';
import { FiltroChecklistControlPatrimonialComponent } from './filtro-checklist-control-patrimonial/filtro-checklist-control-patrimonial.component';
import { Collection } from '../../core/models/collection';

@Component({
  selector: 'yrd-checklist-control-patrimonial',
  templateUrl: './checklist-control-patrimonial.component.html',
  styleUrls: ['./checklist-control-patrimonial.component.css']
})

export class ChecklistControlPatrimonialComponent
       implements OnInit,
                  OnDestroy {

  @ViewChild('filtro') filtro: FiltroChecklistControlPatrimonialComponent;
  @ViewChild('datos') datos: DatosChecklistControlPatrimonialComponent;
  @ViewChild('lista') lista: ListaChecklistControlPatrimonialComponent;

  form: FormGroup;
  subscription: Subscription;
  disableButtons: boolean;

  get checklistForm(): FormArray {
    return this.form.get('checklist') as FormArray;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly popupService: PopupService,
              private readonly service: ChecklistControlPatrimonialService,
              private readonly commandService: CommandService) {
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.onClickAceptar();
        break;
      case 'Cancelar':
        this.onClickCancelar();
        break;
    }
  }

  onClickBuscar() {
    this.service.getMovimiento(this.fcService.getValue('filtro.patenteCamion'), null)
                .subscribe(datos => {
                  if (!datos) {
                    this.popupService.error(Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga);
                  }
                  if (datos.sinControlesPatrimoniales) {
                    this.popupService.error(Resources.Messages.ElCamionIdentificadoNoRequiereControlPatrimonial);
                  } else {
                    this.filtro.setEnableFiltroBusqueda(false);
                    this.datos.completaDatoMovimiento(datos);
                    this.lista.setChecklist(datos.checklist);
                    this.lista.setEnableChecklist(true);
                    this.lista.deshabilitarControlesAprobados();
                    this.disableButtons = false;
                  }
                }, () => {
                  this.popupService.error(Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga);
                });
  }

  onClickAceptar() {
    if (this.fcService.isValidForm()) {
      const command = this.mapControlsToCommand();
      this.service.actualizarControlPatrimonial(command)
                  .subscribe(() => {
                    this.popupService.success(
                      Resources.Messages.ElControlCalidadDeCargaDeCamionesFueGuardadoConExito,
                      Resources.Labels.Aceptar
                    );
                    this.resetForm();
                  });
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickCancelar() {
    this.popupService.confirmOk(() => {
      this.resetForm();
    }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
  }

  private createForm() {
    this.form = this.fb.group({
      filtro: this.fb.group({
        patenteCamion: ['', Validators.required],
      }),
      movimiento: this.fb.group({
        id: { value: '', disabled: true },
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        nroViaje: { value: '', disabled: true },
        titularCP: { value: '', disabled: true },
        vendedor: { value: '', disabled: true },
        patente: { value: '', disabled: true }
      }),
      lista: this.fb.group({
        checklist: this.fb.array([])
      })
    });

    this.fcService.initialize(this.form);
    this.filtro.setEnableFiltroBusqueda(true);
    this.lista.setEnableChecklist(false);
    this.disableButtons = true;
  }

  private mapControlsToCommand(): ChecklistControlPatrimonialCommand {
    const command = new ChecklistControlPatrimonialCommand();
    const lista = this.fcService.getValue('lista.checklist') as ChecklistControlPatrimonial[];
    command.id = this.fcService.getValue('movimiento.id');
    command.checklistControlPatrimonial = lista.filter(ccp => ccp.id === 0 || (ccp.estaAprobado && !ccp.controlado));
    return command;
  }

  private resetForm() {
    this.filtro.setEnableFiltroBusqueda(true);
    this.lista.setEnableChecklist(false);
    this.lista.clearChecklistArray();
    this.disableButtons = true;
    this.fcService.resetForm({emitEvent: true});
  }

}
