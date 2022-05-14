import { ControlarCalidadCargaDataView } from './controlar-calidad-carga-data-view';
import { ChecklistControlPatrimonial } from './checklist-control-patrimonial';

export class ChecklistControlPatrimonialDataView extends ControlarCalidadCargaDataView {
    public checklist: ChecklistControlPatrimonial[];
    public sinControlesPatrimoniales: Boolean;
}
