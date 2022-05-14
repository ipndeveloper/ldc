import { GrupoRubroCalidadAnalisis } from './grupo-rubro-calidad-analisis';
import { EntityWithHints } from '../../core/models/entity-with-hints';

export class ProductoAutocomplete extends EntityWithHints {
  imputaStock: boolean;
  determinaGrado: boolean;
  requiereAnalisisPorTecnologia: boolean;
  grupoRubroAnalisisPorDefecto: GrupoRubroCalidadAnalisis;
  idGrupo: number;
  admiteNetoNegativo: boolean;

  constructor(id: number,
              codigo: string,
              descripcion: string,
              sugerencias: string,
              imputaStock: boolean) {
    super(id, codigo, descripcion, sugerencias);
    this.imputaStock = imputaStock;
  }
}
