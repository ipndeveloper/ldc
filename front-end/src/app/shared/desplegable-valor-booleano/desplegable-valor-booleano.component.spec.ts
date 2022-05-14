import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableValorBooleanoComponent } from './desplegable-valor-booleano.component';
import { TestModule } from '../../core/mocks/test.module';
import { ValorBooleanoServiceService } from './valor-booleano-service.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableValorBooleanoComponent', () => {
  let component: DesplegableValorBooleanoComponent;
  let fixture: ComponentFixture<DesplegableValorBooleanoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableValorBooleanoComponent ],
      providers: [
        DesplegableValorBooleanoComponent,
        ApiService,
        DropdownNotificationService,
        ValorBooleanoServiceService
      ],
      imports: [TestModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableValorBooleanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
