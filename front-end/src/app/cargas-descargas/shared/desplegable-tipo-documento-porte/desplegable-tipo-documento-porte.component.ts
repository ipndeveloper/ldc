import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnInit } from '@angular/core';

import { TipoDocumentoPorte } from '../data-models/tipo-documento-porte';
import { TipoDocumentoPorteService } from './tipo-documento-porte.service';
import { DropdownComponent } from '../../../core/shared/super/dropdown.component';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { map } from 'rxjs/operators';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-desplegable-tipo-documento-porte',
  templateUrl: './desplegable-tipo-documento-porte.component.html',
  styleUrls: ['./desplegable-tipo-documento-porte.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoDocumentoPorteComponent }
  ]
})

export class DesplegableTipoDocumentoPorteComponent extends DropdownComponent<TipoDocumentoPorte> implements OnInit, OnChanges {

  @Input() tipoProducto?: TipoProducto;
  @Input() tipoTransporte?: TipoTransporte;
  @Input() tieneOpcionSeleccione = true;
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-9';
  @Input() todosTipoDocumento = false;
  @ViewChild('selectTipoDocumentoPorte') tipoDocPorteElement: ElementRef;
  seMostroModalDeNoHayTiposDocumentosParametrizados = false;

  constructor(private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
              private readonly popupService: PopupService) {
    super(tipoDocumentoPorteService);
  }

  ngOnInit() {
      this.databind();
  }

  ngOnChanges(changes: SimpleChanges) {
    const tipoProducto = changes['tipoProducto'];
    const tipoTransporte = changes['tipoTransporte'];
    if (((tipoProducto
            && !this.instancesAreEqual(tipoProducto.currentValue, tipoProducto.previousValue))
      || (tipoTransporte
            && !this.instancesAreEqual(tipoTransporte.currentValue, tipoTransporte.previousValue)))) {
          this.databind();
    }
  }

  private instancesAreEqual(instanceA: any, instanceB: any): boolean {
    if (instanceA && instanceB) {
      return instanceA.id === instanceB.id;
    } else {
      return instanceA === instanceB;
    }
  }

  protected getData() {
    let dataObservable =  this.tipoDocumentoPorteService.getByCriteria(this.tipoProducto, this.tipoTransporte);
    if (this.todosTipoDocumento) {
      dataObservable = this.tipoDocumentoPorteService.getAll();
    }
    return dataObservable
      .pipe(
        map((entities: TipoDocumentoPorte[]) => {
          if ((!entities || entities.length === 0) && !this.seMostroModalDeNoHayTiposDocumentosParametrizados) {
            this.seMostroModalDeNoHayTiposDocumentosParametrizados = true;
            this.popupService.error(Resources.Messages.ElTipoDocPorteSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
                                    Resources.Labels.Error,
                                    { timeOut: 10000 });
          }
          return entities;
        })
      );
  }

  setFocus() {
    this.tipoDocPorteElement.nativeElement.focus();
  }
}
