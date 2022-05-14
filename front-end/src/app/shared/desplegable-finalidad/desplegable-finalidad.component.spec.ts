import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableFinalidadComponent } from './desplegable-finalidad.component';
import { FinalidadService } from './finalidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableFinalidadComponent', () => {
  let component: DesplegableFinalidadComponent;
  let fixture: ComponentFixture<DesplegableFinalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableFinalidadComponent],
      imports: [TestModule],
      providers: [
        FinalidadService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableFinalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
