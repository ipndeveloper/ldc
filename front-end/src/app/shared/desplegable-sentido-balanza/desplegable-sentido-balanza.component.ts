import { Component, ElementRef, ViewChild } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DesplegableSentidoBalanzaService } from './desplegable-sentido-balanza.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-sentido-balanza',
  templateUrl: './desplegable-sentido-balanza.component.html',
  styleUrls: ['./desplegable-sentido-balanza.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableSentidoBalanzaComponent }
  ]
})
export class DesplegableSentidoBalanzaComponent extends DropdownComponent<EntityWithDescription> {

 @ViewChild('selectSentidoBalanza') select: ElementRef;

 constructor(sentidoBalanzaService: DesplegableSentidoBalanzaService) {
   super(sentidoBalanzaService);
 }

 setFocus() {
   this.select.nativeElement.focus();
 }
}
