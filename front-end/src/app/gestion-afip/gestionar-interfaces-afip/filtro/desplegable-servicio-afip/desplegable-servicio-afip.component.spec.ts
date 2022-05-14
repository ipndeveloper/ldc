import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableServicioAfipComponent } from './desplegable-servicio-afip.component';
import { ServicioAfipService } from '../servicio-afip.service';
import { TestModule } from '../../../../core/mocks/test.module';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('DesplegableServicioAfipComponent', () => {
  let component: DesplegableServicioAfipComponent;
  let fixture: ComponentFixture<DesplegableServicioAfipComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableServicioAfipComponent ],
      imports: [TestModule],
      providers: [ServicioAfipService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableServicioAfipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
