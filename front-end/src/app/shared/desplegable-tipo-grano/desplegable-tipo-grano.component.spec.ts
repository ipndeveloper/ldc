import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableTipoGranoComponent } from './desplegable-tipo-grano.component';
import { TipoGranoService } from './tipo-grano.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableTipoGranoComponent', () => {
  let component: DesplegableTipoGranoComponent;
  let fixture: ComponentFixture<DesplegableTipoGranoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTipoGranoComponent],
      imports: [TestModule],
      providers: [
        TipoGranoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoGranoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
