import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { Producto } from '../data-models/producto';
import { ProductoService } from './producto.service';
import { SearchComponent } from '../../core/shared/super/search.component';
import { TipoProducto } from '../data-models/tipo-producto';
import { Observable } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';


@Component({
  selector: 'yrd-buscador-producto',
  templateUrl: './buscador-producto.component.html',
  styleUrls: ['./buscador-producto.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorProductoComponent }
  ]
})
export class BuscadorProductoComponent extends SearchComponent<Producto, ProductoService> implements OnInit, OnChanges {

  @Input() tipoProducto: TipoProducto;
  @Input() control: FormControl;
  @Input() etiqueta = 'Producto';
  @Input() filtraPorImputacionStock = false;
  @Output() imputaStock: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('inputCodigoProducto') productoElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-4';
  private readonly codigoFormat = '000';

  constructor(productoService: ProductoService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(productoService, popupService);
  }

  protected limpiarCodigo() {
    this.codigo = '';
    this.codigoAnterior = '';
    this.productoElement.nativeElement.value = '';
  }

  protected callServiceByCode(codigo: string): Observable<Producto | undefined> {
    const codigoWithFormat = this.codigoFormat + codigo;
    codigo = (codigoWithFormat).substr(codigoWithFormat.length - this.codigoFormat.length);
    if (this.tipoProducto) {
      return this.service.getPorCodigoPorTipoProducto(codigo, this.tipoProducto.id);
    } else {
      return this.service.getSinTipo(codigo, this.filtraPorImputacionStock);
    }
  }

  ngOnInit() {
    this.baseElement = this.productoElement;

    this.advancedSearchForm = this.fb.group({
      codigo: '',
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
        name: Resources.Labels.CodigoProducto,
        prop: 'codigo'
      },
      {
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      }
    ];

    this.subscribeToAdvancedSearchFormChanges('codigo', 'codigo');
    this.subscribeToAdvancedSearchFormChanges('descripcion', 'descripcion');
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.tipoProducto) {
      this.filters['idTipoProducto'] = this.tipoProducto.id;
    } else {
      this.filters['idTipoProducto'] = null;
    }

    if (this.filtraPorImputacionStock) {
      this.filters['filtraPorImputacionStock'] = this.filtraPorImputacionStock;
    }
  }
}
