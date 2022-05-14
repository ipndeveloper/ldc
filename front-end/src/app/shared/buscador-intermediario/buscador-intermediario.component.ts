import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Input } from '@angular/core';
import { IntermediarioService } from './intermediario.service';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Intermediario } from '../data-models/intermediario';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-intermediario',
  templateUrl: './buscador-intermediario.component.html',
  styleUrls: ['./buscador-intermediario.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorIntermediarioComponent }
  ]
})
export class BuscadorIntermediarioComponent extends SearchComponent<Intermediario>
  implements OnInit {

  @Input() etiqueta = 'Intermediario';
  @ViewChild('inputIntermediario') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(intermediarioService: IntermediarioService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(intermediarioService, popupService);
  }

  setCurrentEntity(value?: Intermediario): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Intermediario');
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
