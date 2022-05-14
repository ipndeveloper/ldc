import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableServicioSanComponent } from './desplegable-servicio-san.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { ServicioSanService } from './servicio-san.service';

describe('DesplegableServicioSanComponent', () => {
  let component: DesplegableServicioSanComponent;
  let fixture: ComponentFixture<DesplegableServicioSanComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableServicioSanComponent ],
      imports: [TestModule],
      providers: [ServicioSanService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableServicioSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
