import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValorBooleanoServiceService } from './valor-booleano-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-valor-booleano',
  templateUrl: './desplegable-valor-booleano.component.html',
  styleUrls: ['./desplegable-valor-booleano.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableValorBooleanoComponent }
  ]
})
export class DesplegableValorBooleanoComponent extends DropdownComponent<EntityWithDescription> {

  @Input() control: FormControl;
  @Input() etiquetaPrincipal: string;
  @Input() etiquetaTrue: string;
  @Input() etiquetaFalse: string;
  @Input() cssClassTrue = '';
  @Input() cssClassFalse = '';
  @ViewChild('selectValorBooleano') selectValorBooleano: ElementRef;

  get cssClassSelect(): string {
    if (this.selectedEntityId && this.cssClassTrue && this.cssClassFalse) {
      return this.selectedEntityId === 1 ? this.cssClassTrue : this.cssClassFalse;
    }
    return '';
  }

  constructor(valorBooleanoServiceService: ValorBooleanoServiceService) {
    super(valorBooleanoServiceService);
  }

  protected getData(): Observable<EntityWithDescription[]> {
    return of([new EntityWithDescription(1, this.etiquetaTrue), new EntityWithDescription(2, this.etiquetaFalse)]);
  }

  setFocus() {
    setTimeout(() => this.selectValorBooleano.nativeElement.focus(), 0);
  }
}
