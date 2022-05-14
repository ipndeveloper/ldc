import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableDecisionCalidadComponent } from './desplegable-decision-calidad.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableDecisionCalidadComponent', () => {
  let component: DesplegableDecisionCalidadComponent;
  let fixture: ComponentFixture<DesplegableDecisionCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ DesplegableDecisionCalidadComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableDecisionCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo SetFocus', () => {
    it('Invoca al metodo Focus del nativeElement', () => {
      // Arrange
      spyOn(component.select.nativeElement, 'focus');
      // Act
      component.setFocus();
      // Assert
      expect(component.select.nativeElement.focus).toHaveBeenCalledTimes(1);
    });
  });

});
