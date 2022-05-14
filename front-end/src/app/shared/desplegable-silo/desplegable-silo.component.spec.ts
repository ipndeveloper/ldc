import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { DesplegableSiloComponent } from './desplegable-silo.component';
import { SiloService } from './desplegable-silo.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableSiloComponent', () => {
  let component: DesplegableSiloComponent;
  let fixture: ComponentFixture<DesplegableSiloComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableSiloComponent],
      imports: [TestModule],
      providers: [SiloService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableSiloComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
