import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { IntermediarioFlete } from '../data-models/intermediario-flete';
import { IntermediarioFleteService } from './intermediario-flete.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-intermediario-flete',
  templateUrl: './buscador-intermediario-flete.component.html',
  styleUrls: ['./buscador-intermediario-flete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorIntermediarioFleteComponent }
  ]
})
export class BuscadorIntermediarioFleteComponent extends SearchComponent<IntermediarioFlete>
  implements OnInit {

  @Input() etiqueta = 'Intermediario Flete';
  @ViewChild('inputIntermediarioFlete') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(intermediarioFleteService: IntermediarioFleteService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(intermediarioFleteService, popupService);
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
