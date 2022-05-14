import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { ModalSeleccionarMovimientoDataView } from '../../../shared/data-models/modal-seleccionar-movimiento-data-view';

@Component({
  selector: 'yrd-modal-seleccionar-movimiento',
  templateUrl: './modal-seleccionar-movimiento.component.html',
  styleUrls: ['./modal-seleccionar-movimiento.component.css']
})
export class ModalSeleccionarMovimientoComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('foco') foco: ElementRef;
  @Output() movimientoSeleccionado = new EventEmitter<ModalSeleccionarMovimientoDataView>();
  @Output() modalCerrado = new EventEmitter();

  rows: ModalSeleccionarMovimientoDataView[] = [];
  selected: ModalSeleccionarMovimientoDataView[] = [];
  columns: any[];

  constructor(private readonly popupService: PopupService) { }

  ngOnInit() {
    this.setGridColumns();
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
        headerCheckboxable: false,
        checkboxable: true,
        width: 30
      },
      {
        name: 'Número Documento',
        prop: 'documentoPorte',
        width: 100,
      },
      {
        name: 'Titular',
        prop: 'titular',
        width: 150,
      },
      {
        name: 'Producto',
        prop: 'producto',
        width: 100,
      }
    ];
  }

  open(movimientos: ModalSeleccionarMovimientoDataView[]): void {
    this.selected = [];
    this.rows = movimientos;
    this.modal.open();
  }

  onAccept(): void {
    if (this.selected && this.selected.length === 1) {
      this.movimientoSeleccionado.emit(this.selected[0]);
      this.modal.close();
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro);
    }
  }

  onCancel(): void {
    this.modal.close();
    this.modalCerrado.emit();
  }
}
