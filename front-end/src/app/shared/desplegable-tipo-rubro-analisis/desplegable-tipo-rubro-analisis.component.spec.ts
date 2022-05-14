import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoRubroAnalisisComponent } from './desplegable-tipo-rubro-analisis.component';
import { TestModule } from '../../core/mocks/test.module';
import { GrupoRubroAnalisisService } from '../desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';

describe('DesplegableTipoRubroAnalisisComponent', () => {
  let component: DesplegableTipoRubroAnalisisComponent;
  let fixture: ComponentFixture<DesplegableTipoRubroAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTipoRubroAnalisisComponent ],
      imports: [TestModule],
      providers: [GrupoRubroAnalisisService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoRubroAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
