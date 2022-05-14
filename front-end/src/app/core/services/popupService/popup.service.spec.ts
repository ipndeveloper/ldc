import { TestBed } from '@angular/core/testing';
import { PopupService } from './popup.service';
import { ToastrService } from 'ngx-toastr';
import { PopupModule } from './popup.module';

describe('PopupService', () => {
    let service: PopupService;
    let toastr: ToastrService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PopupModule]
        });
        service = TestBed.get(PopupService);
        toastr = TestBed.get(ToastrService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('El metodo error', () => {
        it('invoca al metodo error de toastr', () => {
            // Arrange}
            spyOn(toastr, 'error');

            // Act
            service.error('mensaje', 'titulo', {});

            // Assert
            expect(toastr.error).toHaveBeenCalledWith('mensaje', 'titulo', {});
        });
    });

    describe('El metodo info', () => {
        it('invoca al metodo info de toastr', () => {
            // Arrange}
            spyOn(toastr, 'info');

            // Act
            service.info('mensaje', 'titulo');

            // Assert
            expect(toastr.info).toHaveBeenCalledWith('mensaje', 'titulo');
        });
    });

    describe('El metodo success', () => {
        it('invoca al metodo success de toastr', () => {
            // Arrange}
            spyOn(toastr, 'success');

            // Act
            service.success('mensaje', 'titulo', undefined);

            // Assert
            expect(toastr.success).toHaveBeenCalledWith('mensaje', 'titulo', undefined);
        });
    });

    describe('El metodo warning', () => {
        it('invoca al metodo warning de toastr', () => {
            // Arrange}
            spyOn(toastr, 'warning');

            // Act
            service.warning('mensaje', 'titulo');

            // Assert
            expect(toastr.warning).toHaveBeenCalledWith('mensaje', 'titulo');
        });
    });

});
