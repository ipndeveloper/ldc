import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableCamaraComponent } from './desplegable-camara.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableCamaraComponent', () => {
  let component: DesplegableCamaraComponent;
  let fixture: ComponentFixture<DesplegableCamaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      declarations: [ DesplegableCamaraComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
