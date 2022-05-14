import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ModalAgregarMuestraLaboratorioComponent } from '../modal-agregar-muestra-laboratorio/modal-agregar-muestra-laboratorio.component';
import { MuestraLaboratorioCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/muestra-laboratorio-calidad-movimiento.cereal';
import { DecisionLaboratorio } from '../../gestionar-calidad-por-laboratorio/decision-laboratorio';

@Component({
  selector: 'yrd-datos-laboratorio',
  templateUrl: './datos-laboratorio.component.html',
  styleUrls: ['./datos-laboratorio.component.css']
})
export class DatosLaboratorioComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();
  @ViewChild('modalMuestraLaboratorio') modalMuestraLaboratorio: ModalAgregarMuestraLaboratorioComponent;
  @ViewChild('selectMuestraHeaderTemplate') selectMuestraHeaderTemplate: TemplateRef<any>;
  @ViewChild('selectMuestraCellTemplate') selectMuestraCellTemplate: TemplateRef<any>;
  datosLaboratorioForm: FormGroup;
  columns: any;
  rows: any;
  selectedRows: any;

  private _muestrasLaboratorio = new Array<MuestraLaboratorioCalidadMovimientoCereal>();
  get muestrasLaboratorio() {
    return this._muestrasLaboratorio;
  }

  private _disableActions = true;
  get disableActions() {
    return this._disableActions;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly popupService: PopupService) { }

  ngOnInit() {
    this.createForm();
    this.setGridColumns();
  }

  onClickAgregarMuestraLaboratorio() {
    this.modalMuestraLaboratorio.open();
  }

  onAcceptMuestraLaboratorio(muestraForm: FormGroup) {
    const muestraLaboratorio = new MuestraLaboratorioCalidadMovimientoCereal(muestraForm.controls.codigoBarras.value,
      muestraForm.controls.observaciones.value);
    if (this.muestrasLaboratorio.some(m => m.codigoBarras === muestraLaboratorio.codigoBarras)) {
      this.popupService.error(Resources.Messages.YaExisteUnaMuestraConElCodigoBarraIngresado, Resources.Labels.Aceptar);
    } else {
      this.muestrasLaboratorio.push(muestraLaboratorio);
      this.refreshGrid();
      this.modalMuestraLaboratorio.close();
    }
  }

  onclickEliminarMuestraLaboratorio() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      this.deleteMuestrasSeleccionadas();
      this.refreshGrid();
    } else {
      this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnRegistroParaEliminar,
        Resources.Labels.EliminarMuestraLaboratorio);
    }
  }

  setDatosLaboratorio(muestras: MuestraLaboratorioCalidadMovimientoCereal[], decision: DecisionLaboratorio,
    observaciones: string) {
    const decisionCtrl = this.datosLaboratorioForm.get('decision');
    const observacionesCtrl = this.datosLaboratorioForm.get('observaciones');
    if (decisionCtrl && observacionesCtrl) {
      decisionCtrl.setValue(decision);
      observacionesCtrl.setValue(observaciones);
    }
    this._muestrasLaboratorio = muestras;
    this.refreshGrid();
  }

  setDisabledState(isDisabled: boolean) {
    this._disableActions = isDisabled;
  }

  resetForm() {
    this.datosLaboratorioForm.reset({ emitEvent: true });
    this._muestrasLaboratorio = [];
    this.refreshGrid();
    this._disableActions = true;
  }

  onSelect(rows) {
    this.selectedRows = rows.selected;
  }

  private createForm() {
    this.datosLaboratorioForm = this.fb.group({
      decision: { value: '', disabled: true},
      observaciones: { value: '', disabled: true}
    });

    this.formReady.emit(this.datosLaboratorioForm);
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerTemplate: this.selectMuestraHeaderTemplate,
        cellTemplate: this.selectMuestraCellTemplate,
        width: 30
      },
      {
        name: Resources.Labels.CodigoBarra,
        prop: 'codigoBarras'
      },
      {
        name: Resources.Labels.Observacion,
        prop: 'observaciones'
      }
    ];
  }

  private deleteMuestrasSeleccionadas() {
    this.selectedRows.forEach(row => {
      const muestraToRemove = this.muestrasLaboratorio.find(m => m.codigoBarras === row.codigoBarras);
      if (muestraToRemove) {
        const rowIndex = this.muestrasLaboratorio.indexOf(muestraToRemove, 0);
        if (rowIndex >= 0) {
          this.muestrasLaboratorio.splice(rowIndex, 1);
        }
      }
    });
  }

  private refreshGrid() {
    this.selectedRows = [];
    this.rows = [...this.muestrasLaboratorio];
  }
}
