import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { VariableTemplateService } from './variable-template.service';

@Component({
  selector: 'yrd-multiselect-variable-template',
  templateUrl: './multiselect-variable-template.component.html',
  styleUrls: ['./multiselect-variable-template.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MultiselectVariableTemplateComponent }
  ]
})
export class MultiselectVariableTemplateComponent extends ValidableControl<EntityWithDescription[]> implements OnInit {

  @Input() height = 'auto';

  constructor(private readonly service: VariableTemplateService) {
    super();
  }

  entities: EntityWithDescription[];

  setValue(value?: EntityWithDescription[] | undefined): void {
    if (value) {
      this.valor = value;
    } else {
      this.valor = [];
    }

    if (this.propagateChanges) {
      this.propagateChanges(this.valor);
    }
  }

  ngOnInit() {
    this.databind();
  }

  protected map(objectToMap: any[]): EntityWithDescription[] {
    return objectToMap;
  }

  protected databind(): void {
    this.service.getAll()
      .subscribe(entities => {
        const newEntities = this.map(entities);
        this.entities = newEntities;
      });
  }

  onChange(options: any): void {
    const selected = Array.apply(null, options)
      .filter(option => option.selected)
      .map(option => {
        let selectedEntity = {} as EntityWithDescription;
        if (this.entities) {
          const ent = this.entities.find(entity => entity.id === +option.value);
          if (ent) {
            selectedEntity = ent;
          }
        }
        return selectedEntity;
      });
    this.setValue(selected);
  }

}
