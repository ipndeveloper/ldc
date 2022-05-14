declare global {
    interface Date {
        toLocalISOString(): string;
    }
}

if (!Date.prototype.toLocalISOString) {
    Date.prototype.toLocalISOString = function () {
        const tzoffset = (this.getTimezoneOffset()) * 60000; // offset in milliseconds
        const localISOTime = (new Date(this - tzoffset)).toISOString().slice(0, -1);
        return localISOTime;
    };
}

export { };
