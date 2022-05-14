import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { DetalleAdministrarTiposPuestosTrabajoComponent } from './detalle-administrar-tipos-puestos-trabajo.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

describe('DetalleAdministrarTiposPuestosTrabajoComponent', () => {
  let component: DetalleAdministrarTiposPuestosTrabajoComponent;
  let fixture: ComponentFixture<DetalleAdministrarTiposPuestosTrabajoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarTiposPuestosTrabajoComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTiposPuestosTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test del metodo SetFocus', () => {

    it('Debe ejecutar setFocus sombre nombreAD', fakeAsync(() => {

      // arrange
      component.descripcion = new TextoConEtiquetaComponent();
      const funcionSpy = spyOn<any>(component.descripcion, 'setFocus');

      // act
      component.setFocus();
      tick(5);

      // assert
      expect(funcionSpy).toHaveBeenCalled();
      flush();
    }));

  });

});
