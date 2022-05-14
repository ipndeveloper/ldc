import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { DetalleMuestrasDataView } from '../detalle-muestras-data-view';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { GestionarCalidadPorLaboratorioService } from '../service/gestionar-calidad-por-laboratorio.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-detalle-muestras',
  templateUrl: './modal-detalle-muestras.component.html',
  styleUrls: ['./modal-detalle-muestras.component.css']
})
export class ModalDetalleMuestrasComponent implements OnInit {
  @ViewChild('modalComponent') modal: ModalComponent;
  @Input() rows: any;
  @Input() selected = [];
  @Input() columns: any;
  form: FormGroup;

  get muestras(): FormArray {
    return this.form.get('muestras') as FormArray;
  }

  constructor(private readonly gestionarCalidadPorLaboratorioService: GestionarCalidadPorLaboratorioService,
              private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      muestras: this.fb.array([])
    });
    this.setGridColumns();
  }

  private setRubrosRows(muestras: DetalleMuestrasDataView[]) {
    this.rows = [...muestras];
  }

  private setGridColumns() {
    this.columns = [
      {
        name: Resources.Labels.CodigoBarra,
        prop: 'codigoMuestra',
        width: 200
      },
      {
        name: Resources.Labels.Observacion,
        prop: 'observacion',
        width: 500
      }
    ];
  }

  open(idCalidadMovimientoCereal: number) {
    this.gestionarCalidadPorLaboratorioService.getDetalleMuestras(idCalidadMovimientoCereal)
    .subscribe((muestras: DetalleMuestrasDataView[]) => {
      muestras.forEach(m => {
        this.muestras.push(this.buildMuestra(m));
      });
      this.setRubrosRows(muestras);
    });
    this.modal.open();
  }

  private buildMuestra(muestra: DetalleMuestrasDataView): FormGroup {
    const rubroCalidadFormGroup = this.fb.group({
      id: muestra.id,
      codigoMuestra: muestra.codigoMuestra,
      observacion: muestra.observacion
    });

    return rubroCalidadFormGroup;
  }

}
