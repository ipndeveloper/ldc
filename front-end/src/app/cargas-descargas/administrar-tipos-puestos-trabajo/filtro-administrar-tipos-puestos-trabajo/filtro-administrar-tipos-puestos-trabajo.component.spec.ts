import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FiltroAdministrarTiposPuestosTrabajoComponent } from './filtro-administrar-tipos-puestos-trabajo.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarTiposPuestoTrabajoComponent', () => {
  let component: FiltroAdministrarTiposPuestosTrabajoComponent;
  let fixture: ComponentFixture<FiltroAdministrarTiposPuestosTrabajoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarTiposPuestosTrabajoComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTiposPuestosTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test del metodo SetFocus', () => {

    it('Debe ejecutar setFocus sombre nombreAD', fakeAsync(() => {

      // arrange
      component.tipoPuestoTrabajo = jasmine.createSpyObj('DesplegableTipoPuestoTrabajoComponent', ['setFocus']);

      // act
      component.setFocus();
      tick(5);

      // assert
      expect(component.tipoPuestoTrabajo.setFocus).toHaveBeenCalled();
      flush();
    }));

  });

});
