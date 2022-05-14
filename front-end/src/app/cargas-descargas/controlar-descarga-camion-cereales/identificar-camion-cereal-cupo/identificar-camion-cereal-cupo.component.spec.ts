import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificarCamionCerealCupoComponent } from './identificar-camion-cereal-cupo.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';

describe('IdentificarCamionCerealCupoComponent', () => {
  let component: IdentificarCamionCerealCupoComponent;
  let fixture: ComponentFixture<IdentificarCamionCerealCupoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificarCamionCerealCupoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificarCamionCerealCupoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
