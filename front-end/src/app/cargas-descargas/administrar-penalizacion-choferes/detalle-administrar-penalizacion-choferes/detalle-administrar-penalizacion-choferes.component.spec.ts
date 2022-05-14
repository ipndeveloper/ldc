import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarPenalizacionChoferesComponent } from './detalle-administrar-penalizacion-choferes.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DetalleAdministrarPenalizacionChoferesComponent', () => {
  let component: DetalleAdministrarPenalizacionChoferesComponent;
  let fixture: ComponentFixture<DetalleAdministrarPenalizacionChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarPenalizacionChoferesComponent ],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarPenalizacionChoferesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
