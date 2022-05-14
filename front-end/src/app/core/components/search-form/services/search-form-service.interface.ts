import { Observable } from 'rxjs';
import { Dictionary } from '../../../models/dictionary';

export interface ISearchFormService<TOutput> {
    getData(filters: Dictionary<string>): Observable<TOutput>;
}
