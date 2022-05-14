import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { DesplegableTiempoLimiteEstadoService } from './desplegable-tiempo-limite-estado.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-tiempo-limite-estado',
  templateUrl: './desplegable-tiempo-limite-estado.component.html',
  styleUrls: ['./desplegable-tiempo-limite-estado.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTiempoLimiteEstadoComponent }
  ]
})
export class DesplegableTiempoLimiteEstadoComponent extends DropdownComponent<EntityWithDescription> {

  @Input() etiqueta = 'Estado';
  @Input() mostrarEtiqueta = true;
  @ViewChild('selectEstadoMovimiento') select: ElementRef;

  constructor(private readonly service: DesplegableTiempoLimiteEstadoService,
              protected readonly dropdownNotificationService:  DropdownNotificationService<EntityWithDescription>) {
    super(service, dropdownNotificationService);
  }

  getData(): Observable<EntityWithDescription[]> {
    return this.service.getAll();
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
