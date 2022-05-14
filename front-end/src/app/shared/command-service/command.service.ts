import { Injectable } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Subject, Observable } from 'rxjs';
import * as data from '../../../locale/hotkeys/hotkeys.json';

class HotkeyConfig {
  [key: string]: string[];
}

class ConfigModel {
  hotkeys: HotkeyConfig;
}

export class Command {
  name: string;
  combo: string;
  ev: KeyboardEvent;
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private subject: Subject<Command>;
  commands: Observable<Command>;

  constructor(private readonly hotkeysService: HotkeysService) {
    this.subject = new Subject<Command>();
    this.commands = this.subject.asObservable();

    if (data.default) {
      const hotkeys = data.default.hotkeys as ConfigModel;

      for (const key of Object.keys(hotkeys)) {
        const commands = hotkeys[key];
        this.hotkeysService.add(new Hotkey(key, (ev, combo) => this.hotkey(ev, combo, commands),
          ['INPUT', 'TEXTAREA', 'SELECT'], commands[0]));
      }
    }
  }

  hotkey(ev: KeyboardEvent, combo: string, commands: string[]): boolean {
    commands.forEach(c => {
      const command = {
        name: c,
        ev: ev,
        combo: combo
      } as Command;
      this.subject.next(command);
    });
    return false;
  }
}
