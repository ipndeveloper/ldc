import { Component, ViewChild, EventEmitter, Output, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { GestionarCalidadPorLaboratorioService } from '../service/gestionar-calidad-por-laboratorio.service';
import { RegistrarDecisionCommand } from '../registrar-decision-command';
import { Resources } from '../../../../locale/artifacts/resources';
import { CalidadPorLaboratorioDataView } from '../calidad-por-laboratorio-data-view';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DecisionesLaboratorio } from '../../../shared/enums/enums';
import { Collection } from '../../../core/models/collection';

@Component({
  selector: 'yrd-modal-registrar-decision-laboratorio',
  templateUrl: './modal-registrar-decision-laboratorio.component.html',
  styleUrls: ['./modal-registrar-decision-laboratorio.component.css'],
  providers: [ FormComponentService ]
})
export class ModalRegistrarDecisionLaboratorioComponent implements OnInit, OnDestroy {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() decisionRegistrada = new EventEmitter();
  @Input() accionesHabilitadas: any[] = [];

  calidadPorLaboratorio: CalidadPorLaboratorioDataView;
  form: FormGroup;
  private readonly onDestroy = new Subject();

  validationMessagesDecisionLaboratorio = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Decision)
  };
  validationMessagesCoeficiente = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Coeficiente),
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0.001')
  };

  constructor(private readonly fb: FormBuilder,
              private readonly formService: FormComponentService,
              private readonly service: GestionarCalidadPorLaboratorioService) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.form = this.fb.group({
      decision: [{ value: '', disabled: false }, Validators.required],
      coeficiente: [{ value: '', disabled: true }, [Validators.required, Validators.min(0.001)]],
      observacion: ''
    });
    this.formService.initialize(this.form);
    this.subscribeToDecisionChanges();
  }

  private subscribeToDecisionChanges() {
    const decisionControl = this.form.get('decision');
    if (decisionControl) {
      decisionControl.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
        .subscribe((decision: string) => {
          if (decision && +decision === DecisionesLaboratorio.Aprobado) {
            this.formService.setValue('coeficiente', this.calidadPorLaboratorio.coeficiente, { onlySelf: true });
            if (this.calidadPorLaboratorio.requiereCoeficiente) {
              this.formService.enableControl('coeficiente');
            } else {
              this.formService.disableControl('coeficiente');
            }
          } else {
            this.formService.setValue('coeficiente', '', { onlySelf: true });
            this.formService.disableControl('coeficiente');
          }
        });
    }
  }

  open(calidadPorLaboratorio: CalidadPorLaboratorioDataView) {
    this.calidadPorLaboratorio = calidadPorLaboratorio;
    this.init();
    this.modal.open();
  }

  aceptar() {
    if (this.formService.isValidForm()) {
      const command = new RegistrarDecisionCommand();
      command.idCalidadMovimientoCereal = this.calidadPorLaboratorio.id;
      command.idDecisionLaboratorio = this.formService.getValue('decision');
      command.coeficiente = this.formService.getValue('coeficiente');
      command.observacion = this.formService.getValue('observacion');

      this.service.registrarDecision(command).subscribe(() => {
        this.decisionRegistrada.emit();
        this.modal.close();
      });
    } else {
      const errors = new Collection<string>();
      this.formService.validateForm(this.form.controls, errors, '');
      this.formService.showValidationError(errors);
    }
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
