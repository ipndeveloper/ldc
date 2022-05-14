import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { ModificarProductoFueraCircuitoCommand } from '../modificar-producto-fuera-circuito-command';
import { Observable } from 'rxjs';

@Injectable()
export class ModificarProductoFueraCircuitoService {

  constructor(private readonly apiService: ApiService) { }

  public modificarProducto(command: ModificarProductoFueraCircuitoCommand): Observable<string> {

    return this.apiService.post<string>('modificar-producto-fuera-circuito', command);
  }
}
