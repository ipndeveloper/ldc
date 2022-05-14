import { TestBed } from '@angular/core/testing';
import { FormComponentService } from './formComponent.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TestModule } from '../../mocks/test.module';

describe('FormComponentService', () => {

  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormComponentService
      ],
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
    });

    service = TestBed.get(FormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo initialize', () => {
    it('setea el form con el enviado por parametro', () => {
        // Arrange
        const esperado = new FormGroup({});

        // Act
        service.initialize(esperado);

        // Assert
        expect(service.form).toBe(esperado);
      });
  });

  describe('el metodo enableControl', () => {

    let form: FormGroup;
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl();

      form = new FormGroup({
        'campo': control
      });

      service.form = form;
    });

    it('invoca al enable del control que existe en el form', () => {
        // Arrange
        spyOn(service.form, 'get').and.returnValue(control);
        spyOn(control, 'enable');

        // Act
        service.enableControl('campo');

        // Assert
        expect(control.enable).toHaveBeenCalledTimes(1);
      });

    it('invoca al updateValueAndValidity del control que existe en el form', () => {
        // Arrange
        spyOn(service.form, 'get').and.returnValue(control);
        spyOn(control, 'updateValueAndValidity');

        // Act
        service.enableControl('campo');

        // Assert
        expect(control.updateValueAndValidity).toHaveBeenCalledTimes(2);
    });
  });
});
