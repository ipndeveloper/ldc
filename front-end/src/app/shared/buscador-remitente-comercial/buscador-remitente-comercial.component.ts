import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { RemitenteComercialService } from './remitente-comercial.service';
import { SearchComponent } from '../../core/shared/super/search.component';
import { RemitenteComercial } from '../data-models/remitente-comercial';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-remitente-comercial',
  templateUrl: './buscador-remitente-comercial.component.html',
  styleUrls: ['./buscador-remitente-comercial.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorRemitenteComercialComponent }
  ]
})
export class BuscadorRemitenteComercialComponent extends SearchComponent<RemitenteComercial>
  implements OnInit {

  @Input() control: FormControl;
  @Input() etiqueta = 'Remitente Comercial';
  @ViewChild('inputRemitenteComercial') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(remitenteComercialService: RemitenteComercialService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(remitenteComercialService, popupService);
  }

  setCurrentEntity(value?: RemitenteComercial): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Remitente Comercial');
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
