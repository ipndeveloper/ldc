import { Component, Input, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { SearchComponent } from '../../core/shared/super/search.component';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { Corredor } from '../data-models/corredor';
import { CorredorService } from './corredor.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-buscador-corredor',
  templateUrl: './buscador-corredor.component.html',
  styleUrls: ['./buscador-corredor.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorCorredorComponent }
  ]
})
export class BuscadorCorredorComponent extends SearchComponent<Corredor, CorredorService>
  implements OnInit {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() rol = 'Indistinto';
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @ViewChild('inputCorredor') inputElement: ElementRef;

  constructor(public readonly corredorCompradorService: CorredorService,
              protected readonly popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(corredorCompradorService, popupService);
  }

  setCurrentEntity(value?: Corredor): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, 'Corredor');
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

    this.filters['rol'] = this.rol;
    this.subscribeToAdvancedSearchFormChanges('cuit', 'codigoFiscal');
    this.subscribeToAdvancedSearchFormChanges('descripcion', 'descripcion');
  }

  protected subscribeToAdvancedSearchFormChanges(token: string, keyDict: string): void {
    const filterControl = this.advancedSearchForm.get(token);
    if (filterControl) {
      filterControl.valueChanges.subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  buscar(codigo: string): void {
    this.onTouched();
    if (this.isValidCode(codigo)) {
      if (this.shouldCallServiceByCode(codigo)) {
        this.callServiceByCode(codigo)
          .pipe(catchError((caught: HttpErrorResponse) => {
            if (caught.status === HttpStatus.NOT_FOUND) {
              if (this.popupService) {
                this.popupService.error(Resources.Messages.ElValorIngresadoParaElCampoXNoEsValido.format(this.etiqueta));
              }
              this.setCurrentEntity({codigo: this.baseElement.nativeElement.value, validSearch: false} as any);
              this.notifyChange();
            }
            throw caught;
          }))
          .subscribe(entity => {
            this.setCurrentEntity(entity);
            this.notifyChange();
          });
      }
    } else {
      this.clear();
    }
  }

  protected callServiceByCode(codigo: string): Observable<Corredor> {
    return this.service.getByCodigoRol(codigo, this.rol);
  }
}
