import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableSiNoComponent } from './desplegable-si-no.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SiNoService } from './si-no.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { of } from 'rxjs';

describe('DesplegableSiNoComponent', () => {
  let component: DesplegableSiNoComponent;
  let fixture: ComponentFixture<DesplegableSiNoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableSiNoComponent ],
      providers: [SiNoService],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableSiNoComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{}]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo setFocus', () => {
    it('invoca al focus del nativeElement del select', () => {
      // Arrange
      spyOn(component.select.nativeElement, 'focus');

      // Act
      component.setFocus();

      // Assert
      expect(component.select.nativeElement.focus).toHaveBeenCalledTimes(1);
    });
  });

});
