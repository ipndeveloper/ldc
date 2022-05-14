import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarParametrosPorSociedadComponent } from './administrar-parametros-por-sociedad.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdministrarParametrosPorSociedadService } from './administrar-parametros-por-sociedad.service';

describe('AdministrarParametrosPorSociedadComponent', () => {
  let component: AdministrarParametrosPorSociedadComponent;
  let fixture: ComponentFixture<AdministrarParametrosPorSociedadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarParametrosPorSociedadComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AdministrarParametrosPorSociedadService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarParametrosPorSociedadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
