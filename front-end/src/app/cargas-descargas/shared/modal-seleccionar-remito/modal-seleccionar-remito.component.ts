import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { ModalSeleccionarRemitoDataView } from '../../../shared/data-models/modal-seleccionar-remito-data-view';

@Component({
  selector: 'yrd-modal-seleccionar-remito',
  templateUrl: './modal-seleccionar-remito.component.html',
  styleUrls: ['./modal-seleccionar-remito.component.css']
})
export class ModalSeleccionarRemitoComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('foco') foco: ElementRef;
  @Output() remitoSeleccionado = new EventEmitter<ModalSeleccionarRemitoDataView>();
  @Output() modalCerrado = new EventEmitter();
  @Input() header: String = 'Remito';
  @Input() labelRemito: String = 'Remito';
  @Input() labelVendedor: String = 'Vendedor';

  rows: ModalSeleccionarRemitoDataView[] = [];
  selected: ModalSeleccionarRemitoDataView[] = [];
  columns: any[];

  constructor(private readonly popupService: PopupService) {}

  ngOnInit() {
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
        name: this.labelRemito,
        prop: 'documentoPorte'
      },
      {
        name: this.labelVendedor,
        prop: 'vendedor'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
    ];
  }

  open(remitos: ModalSeleccionarRemitoDataView[]): void {
    this.selected = [];
    this.rows = remitos;
    this.modal.open();
    setTimeout(() => this.foco.nativeElement.focus(), 0);
  }

  onAccept(): void {
    if (this.selected && this.selected.length === 1) {
      this.remitoSeleccionado.emit(this.selected[0]);
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
