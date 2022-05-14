import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorChoferAvanzadoComponent } from './buscador-chofer-avanzado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChoferService } from '../chofer.service';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('BuscadorChoferAvanzadoComponent', () => {
  let component: BuscadorChoferAvanzadoComponent;
  let fixture: ComponentFixture<BuscadorChoferAvanzadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuscadorChoferAvanzadoComponent,
        ModalComponent
      ],
      imports: [
        NgbModule,
        HttpClientModule,
        TestModule
      ],
      providers: [
        ChoferService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorChoferAvanzadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' Test del metodo ngAfterViewInit', () => {

    it('Llaa al metodo setFocus', () => {

      // arrange
      const focusSpy = spyOn<any>(component, 'setFocus');
      focusSpy.calls.reset();

      // act
      component.ngAfterViewInit();

      // assert
      expect(focusSpy).toHaveBeenCalledTimes(1);

    });
  });

});
