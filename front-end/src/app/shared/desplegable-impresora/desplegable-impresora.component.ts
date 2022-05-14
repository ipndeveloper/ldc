import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DesplegableImpresoraService } from './desplegable-impresora.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-impresora',
  templateUrl: './desplegable-impresora.component.html',
  styleUrls: ['./desplegable-impresora.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableImpresoraComponent }
  ]
})
export class DesplegableImpresoraComponent extends DropdownComponent<EntityWithDescription>
 implements OnInit {

  @ViewChild('selectTerminal') select: ElementRef;

  constructor(service: DesplegableImpresoraService) {
    super(service);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

}
