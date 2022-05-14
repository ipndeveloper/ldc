import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { Sede } from '../data-models/sede';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { BuscadorSedeService } from './buscador-sede.service';
import { MovimientoCargaCamion } from '../data-models/movimiento-carga';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';

@Component({
  selector: 'yrd-buscador-sede',
  templateUrl: './buscador-sede.component.html',
  styleUrls: ['./buscador-sede.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorSedeComponent }
  ]
})
export class BuscadorSedeComponent extends SearchComponent<Sede> implements OnInit, OnChanges {

  @Input() esOrigen = false;
  @Input() esSedeOrigenODestino = true;
  @Input() control: FormControl;
  @Input() cssClassControl = 'col-sm-4';
  @Input() movimientoCarga: MovimientoCargaCamion;
  @Input() idSedeOrigen: number;
  @ViewChild('inputSede') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  etiqueta: string;

  constructor(protected readonly sedeService: BuscadorSedeService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(sedeService, popupService);
  }

  ngOnInit(): void {
    this.baseElement = this.inputElement;

    if (this.esSedeOrigenODestino) {
      if (this.esOrigen) {
        this.etiqueta = 'Sede Origen';
      } else {
        this.etiqueta = 'Sede Destino';
      }
    } else {
      this.etiqueta = 'Sede';
    }

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
        name: Resources.Labels.Codigo,
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

  buscar(codigo: string): void {
    this.onTouched();
    if (this.isValidCode(codigo)) {
      if (this.shouldCallServiceByCode(codigo)) {
        this.sedeService.getSede(codigo, this.esOrigen)
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

  ngOnChanges(): void {
    if (this.movimientoCarga && !this.esOrigen) {
      this.filters['esCarga'] = true;
      this.filters['idSedeOrigenCarga'] = this.idSedeOrigen;
      this.filters['idFinalidad'] = this.movimientoCarga.finalidad.id;
      const servicio = this.service as BuscadorSedeService;
      servicio.idFinalidad = this.movimientoCarga.finalidad.id;
      servicio.idSedeOrigenCarga = this.idSedeOrigen;
      servicio.esCarga = true;
      servicio.esOrigen = this.esOrigen;
    }
  }
}
