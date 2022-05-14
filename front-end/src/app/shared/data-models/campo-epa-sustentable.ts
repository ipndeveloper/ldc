import { EntityWithCode } from '../../core/models/entity-with-code';
import { Localidad } from './localidad';
import { Cosecha } from './cosecha';

export class CampoEpaSustentable extends EntityWithCode {

  esSustentable: boolean;
  ciudad: Localidad;
  cosecha: Cosecha;
  codigoRUCA: string;

  constructor(id: number, codigo: string, descripcion: string, readonly idTitular: number) {
    super(id, codigo, descripcion);
  }
}
