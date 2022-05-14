import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoPesadaComponent } from './desplegable-tipo-pesada.component';
import { TipoPesadaService } from './tipo-pesada.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableTipoPesadaComponent', () => {
  let component: DesplegableTipoPesadaComponent;
  let fixture: ComponentFixture<DesplegableTipoPesadaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTipoPesadaComponent],
      imports: [TestModule],
      providers: [TipoPesadaService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoPesadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
