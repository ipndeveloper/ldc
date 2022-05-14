import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarUsuariosComponent } from './administrar-usuarios.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarUsuarioService } from './administrar-usuario.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { UsuarioDataView } from '../../shared/data-models/usuario-data-view';

describe('AdministrarUsuariosComponent', () => {
  let component: AdministrarUsuariosComponent;
  let fixture: ComponentFixture<AdministrarUsuariosComponent>;
  let service: AdministrarUsuarioService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarUsuariosComponent],
      imports: [TestModule],
      providers: [
        AdministrarUsuarioService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarUsuariosComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método clickCopy()', () => {
    beforeEach(() => {
      service = TestBed.get(AdministrarUsuarioService);
      component.form = new FormGroup({});

      spyOn((component as any), 'fillControls');
    });

    it('Obtienes los datos del registro seleccionado', () => {
      // Arrange
      spyOn(service, 'get').and.returnValue(of({}));

      // Act
      (component as any).clickCopy({ id: 0 });

      // Assert
      expect(service.get).toHaveBeenCalledTimes(1);
    });

    it('Llama al método fillControls con los datos obtenidos', () => {
      // Arrange
      const datos = {} as UsuarioDataView;
      spyOn(service, 'get').and.returnValue(of(datos));

      // Act
      (component as any).clickCopy({ id: 0 });

      // Assert
      expect((component as any).fillControls).toHaveBeenCalledTimes(1);
      expect((component as any).fillControls).toHaveBeenCalledWith(datos, true);
    });
  });
});
