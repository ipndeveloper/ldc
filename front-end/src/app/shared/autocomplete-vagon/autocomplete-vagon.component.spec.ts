import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteVagonComponent } from './autocomplete-vagon.component';
import { VagonService } from './vagon.service';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../core/mocks/testing';

describe('AutocompleteVagonComponent', () => {
  let component: AutocompleteVagonComponent;
  let fixture: ComponentFixture<AutocompleteVagonComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutocompleteVagonComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        NgbModule
      ],
      providers: [
        VagonService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteVagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
