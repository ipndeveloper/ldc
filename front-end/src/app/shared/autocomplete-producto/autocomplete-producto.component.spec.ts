import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteProductoComponent } from './autocomplete-producto.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteProductoService } from '../../cargas-descargas/shared/services/autocomplete-producto.service';

describe('AutocompleteProductoComponent', () => {
  let component: AutocompleteProductoComponent;
  let fixture: ComponentFixture<AutocompleteProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteProductoComponent, FocusDirective ],
      imports: [
          TestModule,
          ReactiveFormsModule,
          NgbModule
      ],
      providers: [
        AutocompleteProductoService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
