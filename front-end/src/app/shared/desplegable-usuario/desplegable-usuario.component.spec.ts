import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableUsuarioComponent } from './desplegable-usuario.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('DesplegableUsuarioComponent', () => {
  let component: DesplegableUsuarioComponent;
  let fixture: ComponentFixture<DesplegableUsuarioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableUsuarioComponent ],
      imports: [TestModule],
      providers: [UsuarioService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableUsuarioComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
