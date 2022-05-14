import { OnInit, Input, ElementRef } from '@angular/core';
import { EntityService } from './entity.service';
import { EntityWithDescription } from '../../models/entity-with-description';
import { Observable } from 'rxjs';
import { DropdownNotificationService } from './dropdown-notification.service';
import { ValidableControl } from './validable-control.component';

export abstract class DropdownComponent<T extends EntityWithDescription> extends ValidableControl<T> implements OnInit {

  entities: T[];
  selectedEntityId: number | undefined;
  @Input() opcionSeleccione = false;
  @Input() seleccionaPrimeraOpcion = true;
  baseElement: ElementRef;

  protected writtenSelectedEntityId: number | undefined;
  protected writtenSelectedEntity: T | undefined;
  selectedEntity: T;
  isDisabled: boolean;

  previousValue: any;

  constructor(protected readonly entityService: EntityService<T>,
              protected readonly notificationService?: DropdownNotificationService<T>) { super(); }

  protected set SelectedEntity(value: T) {
    if (value) {
      this.selectedEntity = value;
      this.selectedEntityId = value.id;
      if (this.baseElement) {
        setTimeout(() => {
          this.baseElement.nativeElement.value = this.selectedEntityId;
        }, 0);
      }

      if (this.propagateChanges) {
        this.propagateChanges(this.selectedEntity);
      }

    } else {
      if (this.propagateChanges) {
        this.propagateChanges(value);
      }
    }
  }

  setValue(entity: T): void {
    this.writtenSelectedEntity = entity;
    if (entity) {
      this.writtenSelectedEntityId = entity.id;

      if (this.entities !== undefined && this.entities.length > 0) {
        this.selectedEntityId = this.writtenSelectedEntityId;

        if (this.baseElement) {
          setTimeout(() => {
            this.baseElement.nativeElement.value = this.selectedEntityId;
          }, 0);
        }
      }
    } else {
      if (entity === null && this.entities && this.entities[0] && !this.opcionSeleccione) {
        // HACK: https://auth0.com/blog/understanding-angular-2-change-detection/
        setTimeout(() => this.SelectedEntity = this.entities[0], 0);
      } else {
        this.writtenSelectedEntityId = undefined;
        this.selectedEntityId = undefined;
      }
    }
  }

  ngOnInit() {
    this.databind();
  }

  clear() {
    this.entities = [];
  }

  protected mapEntity(objectToMap: any): T {
    return objectToMap;
  }

  onChange(value: string): void {
    if (this.entities) {
      this.SelectedEntity = this.mapEntity(this.entities.find(entity => entity.id === +value));
    }

    // Check if the item selected was "Todos"
    if (value === '-1' && this.notificationService) {
      this.notificationService.onAllItemsWereSelected(this.entities);
    }
  }

  protected map(objectToMap: any[]): T[] {
    return objectToMap;
  }

  protected getData(): Observable<T[]> {
    return this.entityService.getAll();
  }

  protected databind(): void {
    if (!this.writtenSelectedEntityId && this.selectedEntityId) {
      this.writtenSelectedEntityId = this.selectedEntityId;
    }
    this.getData()
      .subscribe(entities => {
        const newEntities = this.map(entities);
        if (!this.entities ||
            this.entities.length === 0 ||
            newEntities.length === 0 ||
            !this.objectsAreSame(this.entities, newEntities)) {
          this.entities = newEntities;
        }

        let selectedEntity = this.entities.find(entity => entity.id === this.writtenSelectedEntityId);

        // Si se seteo una entidad que no se encuentra en la lista (eliminacion logica o deshabilitado)
        // se la agrega a la lista de entidades
        if (selectedEntity === undefined && this.writtenSelectedEntity) {
          this.entities.push(this.writtenSelectedEntity);
          selectedEntity = this.writtenSelectedEntity;
        }

        if (selectedEntity !== undefined) {
          this.SelectedEntity = selectedEntity;
          if (this.notificationService) {
            this.notificationService.onAllItemsWereSelected(this.entities);
          }
        } else if (this.previousValue) {
          this.trySetPreviousValue();
        } else if (this.entities[0] && !this.opcionSeleccione && this.seleccionaPrimeraOpcion) {
          this.SelectedEntity = this.entities[0];
        } else if (this.entities.length === 0 && this.propagateChanges) {
          this.propagateChanges(selectedEntity);
        }
      });
  }

  trySetPreviousValue() {
    this.onChange(this.previousValue.id);
  }

  objectsAreSame(x: Array<any>, y: Array<any>): boolean {
    let objectsAreSame = true;
    if (x.length > 0 && y.length > 0) {
      objectsAreSame = x.length === y.length;
      if (!objectsAreSame) {
        return objectsAreSame;
      }
      for (const propertyName in x) {
        if (x.hasOwnProperty(propertyName) && y.hasOwnProperty(propertyName)) {
          if (x[propertyName] && y[propertyName]) {
            objectsAreSame = +x[propertyName].id === +y[propertyName].id;
          } else {
            objectsAreSame = x[propertyName] === y[propertyName];
          }
          if (!objectsAreSame) {
            break;
          }
        }
      }
    }
    return objectsAreSame;
 }
}
