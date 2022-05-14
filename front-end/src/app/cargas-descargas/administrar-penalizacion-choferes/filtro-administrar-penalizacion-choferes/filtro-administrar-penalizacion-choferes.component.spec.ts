import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarPenalizacionChoferesComponent } from './filtro-administrar-penalizacion-choferes.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('FiltroAdministrarPenalizacionChoferesComponent', () => {
  let component: FiltroAdministrarPenalizacionChoferesComponent;
  let fixture: ComponentFixture<FiltroAdministrarPenalizacionChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarPenalizacionChoferesComponent ],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarPenalizacionChoferesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
