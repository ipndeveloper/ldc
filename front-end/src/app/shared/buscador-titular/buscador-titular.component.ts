import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Titular } from '../data-models/titular';
import { TitularService } from './titular.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-titular',
  templateUrl: './buscador-titular.component.html',
  styleUrls: ['./buscador-titular.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorTitularComponent }
  ]
})
export class BuscadorTitularComponent extends SearchComponent<Titular> implements OnInit {

  @Input() control: FormControl;
  @Input() etiqueta = 'Titular';
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-4';
  @ViewChild('inputTitular') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(titularService: TitularService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(titularService, popupService);
  }

  setCurrentEntity(value?: Titular): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Titular');
      }
    } else {
      this.limpiarCodigo();
    }
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
