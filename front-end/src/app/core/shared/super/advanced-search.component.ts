import { Observable, of } from 'rxjs';
import { EntityWithCodeService } from './entity-with-codeservice';
import { EntityWithCode } from '../../models/entity-with-code';
import { SearchComponent } from './search.component';

export interface IAdvancedSearchComponent {
    selectedEntity;
}

export abstract class AdvancedSearchComponent<T extends EntityWithCode,
    S extends EntityWithCodeService<T> = EntityWithCodeService<T>> extends SearchComponent<T> implements IAdvancedSearchComponent {

    constructor(service: S) {
        super(service);
        this.entities = of([]);
    }

    public entities: Observable<T[]>;

    public selectedEntity: T;

    public currentEntities: T[];

    public setSelectedEntity(entity: T) {
        if (entity) {
            this.selectedEntity = this.currentEntities.filter((item) => item.id === entity.id)[0];
        }
    }

    public search(criteria: string): void {
        this.currentEntities = this.callService(criteria);
        this.setSelectedEntity(this.currentEntities[0]);
        this.entities = of(this.currentEntities);

        this.afterSearch();
    }

    protected afterSearch(): void {

    }

    protected abstract callService(criteria: string): T[];
}
