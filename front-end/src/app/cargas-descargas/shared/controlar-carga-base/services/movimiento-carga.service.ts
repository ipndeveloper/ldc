import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/restClient/api.service';

export class MovimientoCargaService <TOutput,
                                     TBaseCommand,
                                     TCreateCommand extends TBaseCommand,
                                     TUpdateCommand extends TBaseCommand> {
  apiRoute: string;

  constructor(protected readonly api: ApiService) {
  }

  get(id: number): Observable<TOutput> {
  return this.api.get<TOutput>(`${this.apiRoute}/${id}`);
  }

  create(command: TCreateCommand): Observable<number> {
  return this.api.post(this.apiRoute, command);
  }

  updateFueraDePuesto(command: TUpdateCommand): Observable<number> {
  return this.api.put(`${this.apiRoute}/modificar-fuera-puesto`, command);
  }

  updateFueraDeCircuito(command: TUpdateCommand): Observable<number> {
    return this.api.put(`${this.apiRoute}/modificar-fuera-circuito`, command);
  }

  getViajeCarga(id: number): Observable<TOutput> {
    return this.api.get<TOutput>(`${this.apiRoute}/${id}`);
  }
}
