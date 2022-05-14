import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteFerrocarrilComponent } from './autocomplete-ferrocarril.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { FerrocarrilService } from '../buscador-ferrocarril/ferrocarril.service';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AutocompleteFerrocarrilComponent', () => {
  let component: AutocompleteFerrocarrilComponent;
  let fixture: ComponentFixture<AutocompleteFerrocarrilComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFerrocarrilComponent, FocusDirective ],
      imports: [
          TestModule,
          ReactiveFormsModule,
          NgbModule
      ],
      providers: [
        FerrocarrilService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFerrocarrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
