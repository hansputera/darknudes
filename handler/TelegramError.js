module.exports = class TelegramError extends Error {
    constructor(name, message) {
        super(message);
    }
}