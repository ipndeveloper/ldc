import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarPlataformasComponent } from './filtro-administrar-plataformas.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarPlataformasComponent', () => {
  let component: FiltroAdministrarPlataformasComponent;
  let fixture: ComponentFixture<FiltroAdministrarPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarPlataformasComponent ],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarPlataformasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
