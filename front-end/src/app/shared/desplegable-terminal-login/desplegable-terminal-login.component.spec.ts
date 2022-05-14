import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTerminalLoginComponent } from './desplegable-terminal-login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TerminalService } from './terminal.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { of } from 'rxjs';

describe('DesplegableTerminalLoginComponent', () => {
  let component: DesplegableTerminalLoginComponent;
  let fixture: ComponentFixture<DesplegableTerminalLoginComponent>;
  let service: TerminalService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTerminalLoginComponent],
      imports: [TestModule],
      providers: [TerminalService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTerminalLoginComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(TerminalService);
    spyOn(service, 'getAll').and.returnValue(of([{}]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
