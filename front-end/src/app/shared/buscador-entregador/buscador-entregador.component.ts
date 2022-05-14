import { Component, ViewChild, TemplateRef, OnInit, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Entregador } from '../data-models/entregador';
import { EntregadorService } from './entregador.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-entregador',
  templateUrl: './buscador-entregador.component.html',
  styleUrls: ['./buscador-entregador.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorEntregadorComponent }
  ]
})
export class BuscadorEntregadorComponent extends SearchComponent<Entregador>
  implements OnInit {

  @Input() etiqueta = 'Entregador';
  @ViewChild('inputEntregador') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(entregadorService: EntregadorService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(entregadorService, popupService);
  }

  setCurrentEntity(value?: Entregador): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Entregador');
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
