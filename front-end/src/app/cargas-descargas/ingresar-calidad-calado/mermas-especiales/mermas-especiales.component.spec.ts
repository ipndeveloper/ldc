import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { BooleanToStringPipe } from '../../../core/pipes/boolean-to-string.pipe';
import { DecimalSeparatorPipe } from '../../../core/pipes/decimal-separator.pipe';
import { MermasEspecialesComponent } from './mermas-especiales.component';

describe('MermasEspecialesComponent', () => {
  let component: MermasEspecialesComponent;
  let fixture: ComponentFixture<MermasEspecialesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [MermasEspecialesComponent],
      providers: [
        DecimalSeparatorPipe,
        BooleanToStringPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MermasEspecialesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
