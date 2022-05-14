import { SearchFormService } from './search-form.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/restClient/api.service';

export abstract class AdministrableFormService<TOutput,
                                               TBaseCommand,
                                               TCreateCommand extends TBaseCommand,
                                               TUpdateCommand extends TBaseCommand,
                                               TDataView> extends SearchFormService<TOutput> {
  apiRoute: string;

  constructor(protected readonly api: ApiService) {
    super();
  }

  get(id: number): Observable<TDataView> {
    return this.api.get<TDataView>(`${this.apiRoute}/${id}`);
  }

  create(command: TCreateCommand): Observable<void> {
    return this.api.post(this.apiRoute, command);
  }

  update(command: TUpdateCommand): Observable<void> {
    return this.api.put(this.apiRoute, command);
  }

  delete(id: number): Observable<Object> {
    return this.api.delete(this.apiRoute, id);
  }
}



