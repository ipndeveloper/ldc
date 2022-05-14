import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { SiNoService } from './si-no.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-desplegable-si-no',
  templateUrl: './desplegable-si-no.component.html',
  styleUrls: ['./desplegable-si-no.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableSiNoComponent }
  ]
})
export class DesplegableSiNoComponent extends DropdownComponent<EntityWithDescription>
  implements OnInit {

  @ViewChild('selectSiNo') select: ElementRef;
  @Input() label = 'Habilitado';

  constructor(service: SiNoService) {
    super(service);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
