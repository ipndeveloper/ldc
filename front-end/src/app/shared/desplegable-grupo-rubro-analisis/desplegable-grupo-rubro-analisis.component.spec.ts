import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableGrupoRubroAnalisisComponent } from './desplegable-grupo-rubro-analisis.component';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GrupoRubroAnalisisService } from './grupo-rubro-analisis.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableGrupoRubroAnalisisComponent', () => {
  let component: DesplegableGrupoRubroAnalisisComponent;
  let fixture: ComponentFixture<DesplegableGrupoRubroAnalisisComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableGrupoRubroAnalisisComponent ],
      imports: [
        TestModule,
        ReactiveFormsModule
      ],
      providers: [
        GrupoRubroAnalisisService,
        DropdownNotificationService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableGrupoRubroAnalisisComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
