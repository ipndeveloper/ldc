import { Observable } from 'rxjs';
import { EntityWithCode } from '../../models/entity-with-code';
import { EntityService } from './entity.service';
import { ApiService } from '../../services/restClient/api.service';
import { Dictionary } from '../../models/dictionary';

export abstract class EntityWithCodeService<T extends EntityWithCode> extends EntityService<T> {

  apiRoute: string;

  constructor(protected readonly apiService: ApiService) {
    super();
  }

  get(codigo: string): Observable<T> {
    return this.apiService.get<T>(this.apiRoute + '/' + codigo);
  }

  getAll(): Observable<T[]> {
    return this.apiService.get<T[]>(this.apiRoute);
  }

  getByFilter(filters: Dictionary<string>): Observable<T[]> {
    return this.apiService.get<T[]>(`${this.apiRoute}/filtros?${filters.queryfy()}`);
  }
}
