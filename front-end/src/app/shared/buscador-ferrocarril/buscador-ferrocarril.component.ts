import { Component, ViewChild, OnInit, ElementRef, TemplateRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Transportista } from '../data-models/transportista';
import { FerrocarrilService } from './ferrocarril.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-ferrocarril',
  templateUrl: './buscador-ferrocarril.component.html',
  styleUrls: ['./buscador-ferrocarril.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorFerrocarrilComponent }
  ]
})
export class BuscadorFerrocarrilComponent extends SearchComponent<Transportista, FerrocarrilService> implements OnInit {

  @Input() etiqueta = 'Ferrocarril';
  @ViewChild('inputFerrocarril') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(ferrocarrilService: FerrocarrilService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(ferrocarrilService, popupService);
  }

  ngOnInit() {
    this.baseElement = this.inputElement;

    this.advancedSearchForm = this.fb.group({
      cuit: '',
      descripcion: ''
    });

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
        prop: 'codigoFiscal'
      },
      {
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      }
    ];

    this.subscribeToAdvancedSearchFormChanges('cuit', 'codigoFiscal');
    this.subscribeToAdvancedSearchFormChanges('descripcion', 'descripcion');
  }
}
