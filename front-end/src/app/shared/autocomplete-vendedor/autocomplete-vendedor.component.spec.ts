import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { VendedorService } from '../buscador-vendedor/vendedor.service';

import { AutocompleteVendedorComponent } from './autocomplete-vendedor.component';

describe('AutocompleteVendedorComponent', () => {
  let component: AutocompleteVendedorComponent;
  let fixture: ComponentFixture<AutocompleteVendedorComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutocompleteVendedorComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        NgbModule
      ],
      providers: [
        VendedorService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
