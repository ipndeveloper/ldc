import { Injectable } from '@angular/core';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Productos } from '../../../shared/enums/enums';

@Injectable()
export class ConfirmacionProductoCalado {

    constructor(private readonly popupService: PopupService) {

    }

    confirm(idProducto: number): Promise<boolean> {

        if (idProducto === Productos.SojaEPA) {
            return this.popupService.confirm(Resources.Messages.ControleLaReferenciaDestinoSojaEpa);
        }

        return Promise.resolve(true);
    }
}
