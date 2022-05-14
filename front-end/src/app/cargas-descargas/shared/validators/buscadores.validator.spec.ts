import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TestModule } from '../../../core/mocks/test.module';
import { buscadorPatternValidator, choferInhabilitadoValidator } from './buscadores.validator';
import { EntityWithCode } from '../../../core/models/entity-with-code';
import { Chofer } from '../../../shared/data-models/chofer';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('buscadorPatternValidator', () => {
    let control: FormControl;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
              ReactiveFormsModule,
              TestModule
            ],
        });

        control = new FormControl();
    });

    it('retorna null cuando el value del control es undefined', () => {
        // Arrange
        control.setValue(undefined);

        // Act
        const resultado = buscadorPatternValidator(/d+/)(control);

        // Assert
        expect(resultado).toBeNull();
    });

    it('retorna null cuando el codigo del abstractControl es vacio', () => {
        // Arrange
        control.setValue(new EntityWithCode(1, '', ''));

        // Act
        const resultado = buscadorPatternValidator(/d+/)(control);

        // Assert
        expect(resultado).toBeNull();
    });

    it('retorna buscadorPattern:true cuando el codigo del abstractControl es coincide con la regExp pasada por parametro', () => {
        // Arrange
        control.setValue(new EntityWithCode(1, '123', ''));

        // Act
        const resultado = buscadorPatternValidator(/d+/)(control);

        // Assert
        expect(resultado).toEqual({'buscadorPattern': true});
    });
});


describe('choferInhabilitadoValidator', () => {
    let control: FormControl;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
              ReactiveFormsModule,
              TestModule
            ],
        });

        control = new FormControl();
    });

    it('retorna null cuando el value del control es undefined', () => {
        // Arrange
        control.setValue(undefined);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toBeNull();
    });

    it('retorna null cuando el el chofer esta habilitado', () => {
        // Arrange
        const chofer = new Chofer(1, '', '', '');
        chofer.estaHabilitado = true;
        chofer.penalizado = false;
        control.setValue(chofer);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toBeNull();
    });

    it('retorna choferInhabilitado:true el chofer esta inhabilitado', () => {
        // Arrange
        const chofer = new Chofer(1, '', '', '');
        chofer.estaHabilitado = false;
        chofer.penalizado = false;
        control.setValue(chofer);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toEqual({'choferInhabilitado': true});
    });

    it('retorna null cuando el el chofer no esta penalizado', () => {
        // Arrange
        const chofer = new Chofer(1, '', '', '');
        chofer.estaHabilitado = true;
        chofer.penalizado = false;
        control.setValue(chofer);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toBeNull();
    });

    it('retorna choferPenalizado:true el chofer esta inhabilitado', () => {
        // Arrange
        const chofer = new Chofer(1, '', '', '');
        chofer.estaHabilitado = true;
        chofer.penalizado = true;
        control.setValue(chofer);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toEqual({'choferPenalizado': true});
    });

    it('retorna choferInhabilitado:true y choferPenalizado:true el chofer esta inhabilitado y penalizado', () => {
        // Arrange
        const chofer = new Chofer(1, '', '', '');
        chofer.estaHabilitado = false;
        chofer.penalizado = true;
        control.setValue(chofer);

        // Act
        const resultado = choferInhabilitadoValidator()(control);

        // Assert
        expect(resultado).toEqual({'choferPenalizado': true, 'choferInhabilitado': true});
    });
});
