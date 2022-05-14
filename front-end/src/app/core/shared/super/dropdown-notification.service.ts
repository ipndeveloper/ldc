import { Injectable, Output, EventEmitter } from '@angular/core';
import { EntityWithDescription } from '../../models/entity-with-description';

@Injectable()
export class DropdownNotificationService<T extends EntityWithDescription> {

  @Output() allItemsWereSelected: EventEmitter<T[]> = new EventEmitter();
  @Output() dropdownFilled: EventEmitter<void> = new EventEmitter();

  constructor() { }

  onAllItemsWereSelected(entities: T[]) {
    // entities.shift();
    this.allItemsWereSelected.emit(entities);
  }

  onDropdownFilled() {
    this.dropdownFilled.emit();
  }
}
