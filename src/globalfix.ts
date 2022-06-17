if (typeof window === 'undefined') {
    // @ts-ignore
    window = {
        console: console
    };
} else if (!window.console) {
    window.console = console;
}
if (typeof navigator === 'undefined') {
    // @ts-ignore
    navigator = {
        userAgent: ''
    }
}
if (global && !global.console) {
    global.console = console;
}