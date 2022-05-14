import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableImpresoraComponent } from './desplegable-impresora.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableImpresoraService } from './desplegable-impresora.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableImpresoraComponent', () => {
  let component: DesplegableImpresoraComponent;
  let fixture: ComponentFixture<DesplegableImpresoraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableImpresoraComponent ],
      imports: [TestModule],
      providers: [DesplegableImpresoraService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableImpresoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
