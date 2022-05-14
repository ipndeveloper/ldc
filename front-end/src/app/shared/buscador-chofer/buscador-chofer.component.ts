import { Component, ViewChild, Input, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { Chofer } from '../data-models/chofer';
import { ChoferService } from './chofer.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-buscador-chofer',
  templateUrl: './buscador-chofer.component.html',
  styleUrls: ['./buscador-chofer.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorChoferComponent }
  ]
})
export class BuscadorChoferComponent extends SearchComponent<Chofer> implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Input() control: FormControl;
  @Input() etiqueta = 'Chofer';
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @ViewChild('inputChofer') inputElement: ElementRef;
  advancedSearch = true;
  constructor(choferService: ChoferService,
              private readonly fb: FormBuilder,
              popupService: PopupService) {
    super(choferService, popupService);
  }

  ngOnInit() {
    this.baseElement = this.inputElement;
    this.createForm();
    this.setGridColums();
    this.subscribeToAdvancedSearchFormChanges('cuil', 'cuil');
    this.subscribeToAdvancedSearchFormChanges('descripcion', 'descripcion');
  }

  protected shouldCallServiceByCode(codigo: string): boolean {
    return this.isValidCode(codigo) &&
      (((this.codigoAnterior !== undefined && codigo !== this.codigoAnterior.toString()) || this.codigoAnterior === undefined)
      || !this.control.valid);
  }

  private createForm() {
    this.advancedSearchForm = this.fb.group({
      cuil: '',
      descripcion: ''
    });
  }

  private setGridColums() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Cuit,
        prop: 'codigo'
      },
      {
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      }
    ];
  }
}
