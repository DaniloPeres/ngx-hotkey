export default class Hotkey {
    public altKey = false;
    public ctrlKey = false;
    public metaKey = false;
    public shiftKey = false;
    public key: string;

    private aliases: any = {
        'ctrl': 'control'
    };

    constructor(public shortcut: string, public callback: (event: KeyboardEvent) => boolean) {
        const shortcutFormatted = shortcut.replace(/ /g, '').toLowerCase();
        const shortcutSplit = shortcutFormatted.split('+');

        for (let i = 0; i < shortcutSplit.length; i++) {
            let item = shortcutSplit[i];
            item = this.aliases[item] || item;

            if (i === shortcutSplit.length - 1) {
                this.key = item;
                continue;
            }

            switch (item) {
                case 'shift':
                    this.shiftKey = true;
                    break;
                case 'control':
                    this.ctrlKey = true;
                    break;
                case 'alt':
                    this.altKey = true;
                    break;
                case 'meta':
                    this.metaKey = true;
                    break;
                default:
                    console.error(`They shortcut '${shortcut}' is not valid!`);
            }
        }
    }
}