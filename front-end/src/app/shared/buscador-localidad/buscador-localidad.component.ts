import { Component, Input, ViewChild, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Localidad } from '../data-models/localidad';
import { LocalidadService } from './localidad.service';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-localidad',
  templateUrl: './buscador-localidad.component.html',
  styleUrls: ['./buscador-localidad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorLocalidadComponent }
  ]
})
export class BuscadorLocalidadComponent extends SearchComponent<Localidad> implements OnInit {
  @ViewChild('inputLocalidad') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @Input() cssClassEtiqueta = 'col-sm-3 col-form-label';
  @Input() cssClassControl = 'col-sm-3';
  @Input() etiqueta = 'Localidad:';
  @Input() control: FormControl;

  constructor(localidadService: LocalidadService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(localidadService, popupService);
  }

  ngOnInit() {
    this.baseElement = this.inputElement;

    this.advancedSearchForm = this.fb.group({
      codigoPostal: '',
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
        name: Resources.Labels.CodigoPostal,
        prop: 'codigo'
      },
      {
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      }
    ];

    this.subscribeToAdvancedSearchFormChanges('codigoPostal', 'codigo');
    this.subscribeToAdvancedSearchFormChanges('descripcion', 'descripcion');
  }
}

