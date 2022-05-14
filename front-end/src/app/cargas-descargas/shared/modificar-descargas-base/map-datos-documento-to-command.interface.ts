import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

export interface IMapDatosDocumentoToCommand<TCommand> {
    MapDatosDocumentoToCommand(fcService: FormComponentService, command: TCommand): void;
}
