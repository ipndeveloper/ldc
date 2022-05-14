import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { DecisionesLaboratorio } from '../../../shared/enums/enums';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'yrd-desplegable-decision-laboratorio',
  templateUrl: './desplegable-decision-laboratorio.component.html',
  styleUrls: ['./desplegable-decision-laboratorio.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableDecisionLaboratorioComponent }
  ]
})
export class DesplegableDecisionLaboratorioComponent implements OnInit {
  @Input() accionesHabilitadas: any[];
  @Input() form: FormGroup;
  @Input() seleccionarDecision: false;

  aprobado: DecisionesLaboratorio = DecisionesLaboratorio.Aprobado;
  rechazar: DecisionesLaboratorio = DecisionesLaboratorio.Rechazado;
  reCalar: DecisionesLaboratorio = DecisionesLaboratorio.ReCalar;

  AprobarActivado: boolean;
  RechazarActivado: boolean;
  ReCalarActivado: boolean;

  constructor() { }

  ngOnInit() {
    this.getAccionesHabilitadas();
    this.subscribeDecisionLaboratorio();
  }

  private getAccionesHabilitadas () {
    if (this.accionesHabilitadas) {
      this.AprobarActivado = this.accionesHabilitadas.find(e => e.accion === 'AprobarActivado').activada;
      this.RechazarActivado = this.accionesHabilitadas.find(e => e.accion === 'RechazarActivado').activada;
      this.ReCalarActivado = this.accionesHabilitadas.find(e => e.accion === 'ReCalarActivado').activada;
    }
  }

   private subscribeDecisionLaboratorio() {
    const decisionLaboratorio = this.form.get('decision');
    if (decisionLaboratorio) {
      decisionLaboratorio.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          if (this.seleccionarDecision) {
            this.getDecisionLaboratorio();
          }
      });
    }
   }

   private getDecisionLaboratorio() {
    const decision = this.form.get('decision');
    if (decision && decision.value) {
      this.AprobarActivado =  decision.value.id === DecisionesLaboratorio.Aprobado;
      this.RechazarActivado = decision.value.id === DecisionesLaboratorio.Rechazado;
      this.ReCalarActivado =  decision.value.id === DecisionesLaboratorio.ReCalar;
    }
   }


}
