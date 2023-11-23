function clearString (str) {
    if (typeof str !== "string" || Boolean(str) === false) return str;
    return str.trim().replace(/[\t\n]/g, '');
}

module.exports = { clearString };