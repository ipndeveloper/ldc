import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormTemplateComponent } from './search-form-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../modal/modal.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DataGridComponent } from '../../controls/data-grid/data-grid.component';
import { SearchFormActionsNotifierService } from '../search-form/services/search-form-actions-notifier.service';
import { configureTestSuite } from '../../mocks/testing';

describe('SearchFormTemplateComponent', () => {
  let component: SearchFormTemplateComponent;
  let fixture: ComponentFixture<SearchFormTemplateComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchFormTemplateComponent,
        DataGridComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        ModalModule,
        NgxDatatableModule,
        RouterModule
      ],
      providers: [
        SearchFormActionsNotifierService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
