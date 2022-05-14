import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { DesplegablePlataformaDescargaComponent } from './desplegable-plataforma-descarga.component';
import { PlataformaDescargaService } from './plataforma-descarga.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DespegablePlataformaDescargaComponent', () => {
  let component: DesplegablePlataformaDescargaComponent;
  let fixture: ComponentFixture<DesplegablePlataformaDescargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegablePlataformaDescargaComponent],
      imports: [TestModule],
      providers: [PlataformaDescargaService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegablePlataformaDescargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
