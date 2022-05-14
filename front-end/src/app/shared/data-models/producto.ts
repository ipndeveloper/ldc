import { GrupoRubroCalidadAnalisis } from './grupo-rubro-calidad-analisis';
import { EntityWithCode } from '../../core/models/entity-with-code';

export class Producto extends EntityWithCode {
  imputaStock: boolean;
  determinaGrado: boolean;
  requiereAnalisisPorTecnologia: boolean;
  grupoRubroAnalisisPorDefecto: GrupoRubroCalidadAnalisis;
  idGrupo: number;
  admiteNetoNegativo: boolean;

  constructor(id: number,
              codigo: string,
              descripcion: string,
              imputaStock: boolean) {
    super(id, codigo, descripcion);
    this.imputaStock = imputaStock;
  }
}
