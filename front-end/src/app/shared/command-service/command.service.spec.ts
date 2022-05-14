import { TestBed, inject } from '@angular/core/testing';

import { CommandService } from './command.service';
import { TestModule } from '../../core/mocks/test.module';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';

describe('CommandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HotkeyModule.forRoot(),
      ],
      providers: [
        CommandService,
        HotkeysService
      ]
    });
  });

  it('should be created', inject([CommandService], (service: CommandService) => {
    expect(service).toBeTruthy();
  }));
});
