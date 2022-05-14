import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableImpresorasPorUsuarioComponent } from './desplegable-impresoras-por-usuario.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableImpresorasPorUsuarioService } from './desplegable-impresoras-por-usuario.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableImpresorasPorUsuarioComponent', () => {
  let component: DesplegableImpresorasPorUsuarioComponent;
  let fixture: ComponentFixture<DesplegableImpresorasPorUsuarioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableImpresorasPorUsuarioComponent],
      imports: [TestModule],
      providers: [DesplegableImpresorasPorUsuarioService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableImpresorasPorUsuarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
