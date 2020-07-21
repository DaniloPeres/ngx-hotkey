import { Injectable } from '@angular/core';
import Hotkey from './hotkey.model';

@Injectable({
    providedIn: 'root'
})
export class NgxHotkeyService {
    private hotkeys: Hotkey[] = [];

    constructor() {
        document.addEventListener('keydown', this.checkKeyUp.bind(this), false);
    }

    add(shortcut: string, callback: (event: KeyboardEvent) => boolean) {
        this.hotkeys.push(new Hotkey(shortcut, callback));
    }

    remove(shortcut: string) {
        this.hotkeys = this.hotkeys.filter(x => x.shortcut !== shortcut);
    }

    private checkKeyUp(event: KeyboardEvent): boolean {
        for (let i = 0; i < this.hotkeys.length; i++) {
            const hotkey = this.hotkeys[i];
            if (this.checkHotKey(event, hotkey))
                return hotkey.callback(event);
        }

        return false;
    }

    private checkHotKey(event: KeyboardEvent, hotkey: Hotkey): boolean {
        return event.altKey === hotkey.altKey
            && event.ctrlKey === hotkey.ctrlKey
            && event.metaKey === hotkey.metaKey
            && event.shiftKey === hotkey.shiftKey
            && event.key.toLowerCase() === hotkey.key;
    }
}
