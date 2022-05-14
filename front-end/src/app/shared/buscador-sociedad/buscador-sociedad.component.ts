import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { BuscadorSociedadService } from './buscador-sociedad.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-sociedad',
  templateUrl: './buscador-sociedad.component.html',
  styleUrls: ['./buscador-sociedad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorSociedadComponent }
  ]
})
export class BuscadorSociedadComponent extends SearchComponent<EntityWithCode> implements OnInit {

  @Input() etiqueta = 'Sociedad';
  @ViewChild('inputSociedad') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(sociedadService: BuscadorSociedadService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(sociedadService, popupService);
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
