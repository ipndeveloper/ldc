import { Input, ViewChild } from '@angular/core';
import { DesplegablePuestoTrabajoComponent } from '../../shared/desplegable-puesto-trabajo/desplegable-puesto-trabajo.component';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { AdministrarRestriccionesPorPuestoTrabajoService } from './administrar-restricciones-por-puesto-trabajo.service';
import { Terminal } from '../../shared/data-models/terminal';
import { DesplegableTerminalComponent } from '../../shared/desplegable-terminal/desplegable-terminal.component';
import { PuestoTrabajo } from '../../shared/data-models/puesto-trabajo';

export abstract class AdministrarRestriccionesControls {
  @Input() form: FormGroup;
  @Input() esModificacion = false;
  @Input() esConsulta = false;
  @ViewChild('desplegablePuestoTrabajo') desplegablePuestoTrabajo: DesplegablePuestoTrabajoComponent;
  @ViewChild('desplegableTerminal') desplegableTerminal: DesplegableTerminalComponent;

  constructor(public readonly service: AdministrarRestriccionesPorPuestoTrabajoService) { }

  public subscribeCambioTerminal(): void {
    const terminal = this.form.get('terminal');
    const puestoTrabajo = this.form.get('puestoTrabajo');
    if (terminal && puestoTrabajo) {
      terminal.valueChanges.pipe(distinctUntilChanged()).subscribe((value: Terminal) => {
        if (value && !this.esModificacion && !this.esConsulta) {
          this.service.getPuestosDeTrabajoPorTerminal(value.id).subscribe((data => {
            this.setPuestosTrabajo(data);
            puestoTrabajo.enable();
          }));
        }
      });
    }
  }

  setPuestosTrabajo(puestos: PuestoTrabajo[]): void {
    this.desplegablePuestoTrabajo.entities = puestos;
  }

  setFocus() {
    setTimeout(() => {
        this.desplegableTerminal.setFocus();
    }, 0);
  }
}
