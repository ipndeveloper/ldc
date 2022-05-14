import { HotkeysService, IHotkeyOptions } from 'angular2-hotkeys';

export class MockHotkeyOptions implements IHotkeyOptions {
}

export class MockHotkeysService extends HotkeysService {
    constructor() {
        super(new MockHotkeyOptions());

    }
}
