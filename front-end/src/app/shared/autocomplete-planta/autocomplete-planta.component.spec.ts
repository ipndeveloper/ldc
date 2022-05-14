import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';

import { AutocompletePlantaComponent } from './autocomplete-planta.component';

describe('AutocompletePlantaComponent', () => {
  let component: AutocompletePlantaComponent;
  let fixture: ComponentFixture<AutocompletePlantaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutocompletePlantaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        NgbModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
