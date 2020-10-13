import { Injectable } from '@angular/core';
import Hotkey from './hotkey.model';

@Injectable({
    providedIn: 'root'
})
export class NgxHotkeyService {
    private hotkeys: Hotkey[] = [];
    private lastHotkeyFired: Hotkey;

    constructor() {
        document.addEventListener('keydown', this.checkKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    add(shortcut: string, callback: (event: KeyboardEvent) => boolean) {
        this.hotkeys.push(new Hotkey(shortcut, callback));
    }

    remove(shortcut: string) {
        this.hotkeys = this.hotkeys.filter(x => x.shortcut !== shortcut);
    }

    private checkKeyDown(event: KeyboardEvent): boolean {
        for (let i = 0; i < this.hotkeys.length; i++) {
            const hotkey = this.hotkeys[i];
            if (this.checkHotKey(event, hotkey) && !this.isTheSameLastHotkeyFired(hotkey)) {
                this.lastHotkeyFired = hotkey;
                return hotkey.callback(event);
            }
        }

        return false;
    }

    private onKeyUp(): boolean {
        this.lastHotkeyFired = null;
        return false;
    }

    private checkHotKey(event: KeyboardEvent, hotkey: Hotkey): boolean {
        return event.altKey === hotkey.altKey
            && event.ctrlKey === hotkey.ctrlKey
            && event.metaKey === hotkey.metaKey
            && event.shiftKey === hotkey.shiftKey
            && event.key.toLowerCase() === hotkey.key;
    }

    private isTheSameLastHotkeyFired(hotkey: Hotkey) {
        return hotkey === this.lastHotkeyFired;
    }
}
