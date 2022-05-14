import {  TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TestModule } from '../../../core/mocks/test.module';
import { patenteCamionDistintaPatenteAcopladoValidator } from './patente.validator';
import { configureTestSuite } from '../../../core/mocks/testing';


describe('patenteCamionDistintaPatenteAcopladoValidator', () => {

    let control: AbstractControl;
    let controlCamion: AbstractControl;
    let controlAcoplado: AbstractControl;

    configureTestSuite(() => {
        controlCamion = new FormControl('ABC123');
        controlAcoplado = new FormControl('ABC999');

        control = new FormGroup({
            patenteCamion: controlCamion,
            patenteAcoplado: controlAcoplado
        });

        TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            TestModule
          ],
        });
    });

    it('retorna patenteCamionDistintaPatenteAcoplado las patentes son iguales', () => {
        // Arrange
        control.patchValue({ patenteAcoplado: 'ABC123' });
        control.patchValue({ patenteCamion: 'ABC123' });

        // Act
        const result = patenteCamionDistintaPatenteAcopladoValidator()(control);

        // Assert
        expect(result).toEqual({ 'patenteCamionDistintaPatenteAcoplado': true });
    });
});
