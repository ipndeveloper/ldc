import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { FiltroAdministrarUsuariosComponent } from './filtro-administrar-usuarios.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

describe('FiltroAdministrarUsuariosComponent', () => {
  let component: FiltroAdministrarUsuariosComponent;
  let fixture: ComponentFixture<FiltroAdministrarUsuariosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarUsuariosComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarUsuariosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test metodo setFocus', () => {

    it('Debe ejecutar setFocus sombre usuario', fakeAsync(() => {

      // arrange
      component.usuario = new TextoConEtiquetaComponent();
      const funcionSpy = spyOn<any>(component.usuario, 'setFocus');

      // act
      component.setFocus();
      tick(10);

      // assert
      expect(funcionSpy).toHaveBeenCalled();
      flush();
    }));

  });

});
