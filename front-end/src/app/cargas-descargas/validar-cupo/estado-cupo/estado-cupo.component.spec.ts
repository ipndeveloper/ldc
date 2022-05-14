import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCupoComponent } from './estado-cupo.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EstadoCupoService } from './estado-cupo.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

describe('EstadoCupoComponent', () => {
  let component: EstadoCupoComponent;
  let fixture: ComponentFixture<EstadoCupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ EstadoCupoComponent ],
      providers: [EstadoCupoService, FormComponentService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCupoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
