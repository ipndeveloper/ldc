import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMotivosNoDescargaComponent } from './lista-motivos-no-descarga.component';
import { MotivosNoDescargaService } from './motivos-no-descarga.service';
import { TestModule } from '../../../../core/mocks/test.module';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ListaMotivosNoDescargaComponent', () => {
  let component: ListaMotivosNoDescargaComponent;
  let fixture: ComponentFixture<ListaMotivosNoDescargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMotivosNoDescargaComponent ],
      imports: [TestModule],
      providers: [
        MotivosNoDescargaService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMotivosNoDescargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
