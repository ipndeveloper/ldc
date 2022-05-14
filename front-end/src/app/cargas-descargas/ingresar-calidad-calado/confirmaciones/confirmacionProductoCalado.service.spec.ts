import { TestBed, inject } from '@angular/core/testing';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ConfirmacionProductoCalado } from './confirmacionProductoCalado.service';
import { Productos } from '../../../shared/enums/enums';

describe('ConfirmacionProductoCalado', () => {

    let service: ConfirmacionProductoCalado;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [
                ConfirmacionProductoCalado,
                PopupService]
        });
    });

    beforeEach(inject([ConfirmacionProductoCalado], (svc) => {
        service = svc;
    }));

    it('should be created', inject([ConfirmacionProductoCalado], (confirm: ConfirmacionProductoCalado) => {
        expect(confirm).toBeTruthy();
    }));

    describe('El Método confirm', function () {

        it('Llama al método confirm en caso que el id enviado como argumento sea el correspondiente a soja epa', inject([PopupService],
            (popupService: PopupService) => {

                spyOn(popupService, 'confirm');

                service.confirm(Productos.SojaEPA);

                expect(popupService.confirm).toHaveBeenCalledTimes(1);
            }));

        it('No Llama al método confirm en caso que el id enviado como argumento no corresponda a soja epa', inject([PopupService],
            (popupService: PopupService) => {

                spyOn(popupService, 'confirm');

                service.confirm(Productos.SojaEPA + 1);

                expect(popupService.confirm).toHaveBeenCalledTimes(0);
            }));
    });
});
