import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegablePermisoComponent } from './desplegable-permiso.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';

describe('DesplegablePermisoComponent', () => {
  let component: DesplegablePermisoComponent;
  let fixture: ComponentFixture<DesplegablePermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegablePermisoComponent],
      imports: [TestModule],
      providers: [
        ApiService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegablePermisoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
