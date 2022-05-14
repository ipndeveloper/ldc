import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { Destinatario } from '../data-models/destinatario';
import { DestinatarioService } from './destinatario.service';
import { SearchComponent } from '../../core/shared/super/search.component';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-destinatario',
  templateUrl: './buscador-destinatario.component.html',
  styleUrls: ['./buscador-destinatario.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorDestinatarioComponent }
  ]
})
export class BuscadorDestinatarioComponent extends SearchComponent<Destinatario>
  implements OnInit {

  @Input() etiqueta = 'Destinatario';
  @Input() cssClassControl = 'col-sm-4';
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @ViewChild('inputDestinatario') inputElement: ElementRef;

  constructor(destinatarioService: DestinatarioService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(destinatarioService, popupService);
  }

  setCurrentEntity(value?: Destinatario): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Destinatario');
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
