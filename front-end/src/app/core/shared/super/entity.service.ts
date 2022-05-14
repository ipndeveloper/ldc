import { Observable, of } from 'rxjs';
import { Entity } from '../../models/entity';

export abstract class EntityService<T extends Entity> {

  protected get entities(): T[] {
    return [];
  }

  getAll(): Observable<T[]> {
    return of(this.entities);
  }
}
