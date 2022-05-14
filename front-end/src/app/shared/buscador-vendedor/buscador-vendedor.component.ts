import { Component, ViewChild, TemplateRef, OnInit, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { VendedorService } from './vendedor.service';
import { Vendedor } from '../data-models/vendedor';
import { SearchComponent } from '../../core/shared/super/search.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-buscador-vendedor',
  templateUrl: './buscador-vendedor.component.html',
  styleUrls: ['./buscador-vendedor.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorVendedorComponent }
  ]
})

export class BuscadorVendedorComponent extends SearchComponent<Vendedor, VendedorService>
  implements OnInit {

  @Input() etiqueta = 'Vendedor';
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-4';
  @Input() debeMostrarMensajeOncca = false;
  @Input() rol = 'Vendedor';
  @ViewChild('inputVendedor') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  constructor(vendedorService: VendedorService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(vendedorService, popupService);
  }

  setCurrentEntity(value?: Vendedor): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
      if (this.currentEntity.mensajeErrorOncca && this.popupService && this.debeMostrarMensajeOncca) {
        this.popupService.warning(this.currentEntity.mensajeErrorOncca, Resources.Labels.Vendedor);
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

  protected callServiceByCode(codigo: string): Observable<Vendedor> {
    return this.service.getByCodigoRol(codigo, this.rol);
  }
}
