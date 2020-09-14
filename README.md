# ngx-hotkey

ngx-hotkey is an easy way to register shortcuts in Angular.

## Setup

### Installation

Install from npm repository:
```
npm install ngx-hotkey --save
 ```
--------------------
Include ngx-hotkey in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
...

import { NgxHotkeyService } from 'ngx-hotkey'; // <- Import the library
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    ...
    NgxHotkeyService // <- Add this service
  ],
  bootstrap: [...]
})
export class AppModule {
}
```

## Sample

```typescript
import { Component, OnDestroy } from '@angular/core';
import { NgxHotkeyService } from 'ngx-hotkey';

@Component({
    selector: 'my-comp'
})
export class MyComp implements OnDestroy {

    constructor(private ngxHotKeyService: NgxHotkeyService) {
        this.ngxHotKeyService.add('ctrl+b', (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();
            alert('ctrl+b pressed');
            return true;
        });
        this.ngxHotKeyService.add('control+a', (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();
            alert('ctrl+a pressed');
            return true;
        });
        this.ngxHotKeyService.add('ctrl+shift+s', (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();
            alert('ctrl+shift+a pressed');
            return true;
        });
    }

    ngOnDestroy() {
        // remove shortcuts
        this.ngxHotKeyService.remove('ctrl+b');
        this.ngxHotKeyService.remove('control+a');
        this.ngxHotKeyService.remove('ctrl+shift+s');
    }
}
```

## Author
Danilo Peres
danilo_meirelles@hotmail.com

## License

MIT © [Danilo Peres](https://github.com/daniloperes)
