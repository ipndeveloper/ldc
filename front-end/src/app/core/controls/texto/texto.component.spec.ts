import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoComponent } from './texto.component';
import { TestModule } from '../../mocks/test.module';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextoComponent', () => {
  let component: TextoComponent;
  let fixture: ComponentFixture<TextoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
