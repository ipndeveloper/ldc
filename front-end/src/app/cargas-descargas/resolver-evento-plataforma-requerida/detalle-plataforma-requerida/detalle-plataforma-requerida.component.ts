import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ResolverEventoPlataformaRequerdidaService } from '../resolver-evento-plataforma-requerida.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { PlataformaBalanzaDataView } from '../../../../app/shared/data-models/plataforma-balanza-data-view';

@Component({
  selector: 'yrd-detalle-plataforma-requerida',
  templateUrl: './detalle-plataforma-requerida.component.html',
  styleUrls: ['./detalle-plataforma-requerida.component.css']
})
export class DetallePlataformaRequeridaComponent implements OnInit {

  detalleForm: FormGroup;
  columns: any;
  rows: any;
  selectedRow = [];
  @Input() pathArchestra: string;
  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);

  get plataformaForm() {
    return this.detalleForm.get('log') as FormArray;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: ResolverEventoPlataformaRequerdidaService
  ) { }

  ngOnInit() {
    this.detalleForm = this.formBuilder.group({
      log: this.formBuilder.array([])
    });
    this.service.obtenerPlataformasRequeridas(this.pathArchestra)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.setPlataformas(data);
      });

    this.setGridColumns();
  }

  private setPlataformas(checklist: PlataformaBalanzaDataView[]): void {
    this.clearLog();
    checklist.forEach(l => {
      this.plataformaForm.push(this.buildLog(l));
    });
    this.refreshGrid();
  }


  private clearLog() {
    while (this.plataformaForm.length !== 0) {
      this.plataformaForm.removeAt(0);
    }
    this.refreshGrid();
  }

  private buildLog(value: PlataformaBalanzaDataView): FormGroup {
    const checklistFormGroup = this.formBuilder.group({
      balanzaAutomatizada: { value: value.balanzaAutomatizada, disabled: false },
      camionesAsignados: { value: value.camionesAsignados, disabled: false },
      capacidadMaxima: { value: value.capacidadMaxima, disabled: false },
      excedente: { value: value.excedente, disabled: false },
      idPlataforma: { value: value.idPlataforma, disabled: false }
    });
    return checklistFormGroup;
  }

  private setGridColumns() {
    this.columns = [
      {
        name: 'Balanza Automatizada',
        prop: 'value.balanzaAutomatizada',
        width: 300,
      },
      {
        name: 'Capacidad Máxima',
        prop: 'value.capacidadMaxima',
      },
      {
        name: 'Camiones Asignados',
        prop: 'value.camionesAsignados',
      },
      {
        name: 'Excedente',
        prop: 'value.excedente',
      }
    ];
  }

  refreshGrid() {
    this.rows = [...this.plataformaForm.controls];
  }
}
