import { Observable } from 'rxjs';
import { ISearchFormService } from './search-form-service.interface';
import { Dictionary } from '../../../models/dictionary';

export abstract class SearchFormService<TOutput>
           implements ISearchFormService<TOutput> {

  apiRoute: string;

  constructor() {
  }

  public abstract getData(filters: Dictionary<string>): Observable<TOutput>;

  public abstract validateSearchClick(filters?: Dictionary<string>): boolean;

  /** Devuelve un string de la forma '&keyUrl=filters[dictionaryKey]' si es que existe el valor.
   * Si no se provee de keyUrl, sera de la forma '&dictionaryKey=filters[dictionaryKey]'.
   * Si el valor de filters[dictionaryKey] es una entidad, se devolverá el id de la misma como valor.
   * @param filters Diccionario con filtros
   * @param dictionaryKey Key para acceder al diccionario
   * @param keyUrl Nombre del parametro en la querystring */
  public getQuerystringParameter(filters: Dictionary<any>, dictionaryKey: string, keyUrl = ''): string {
    let result = '';
    if (filters.containsKey(dictionaryKey)) {
      const value = filters.item(dictionaryKey);
      if (value != null && value !== undefined && value !== '') {
        if (value.id !== undefined) {
          result = value.id;
        } else {
          result = value;
        }
      }
    }
    if (result !== '') {
      if (!keyUrl) {
        keyUrl = dictionaryKey;
      }
      result = `&${keyUrl}=${result}`;
    }
    return result;
  }
}
