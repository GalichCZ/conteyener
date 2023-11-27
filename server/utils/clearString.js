function clearString (str) {
    if (typeof str !== "string" || Boolean(str) === false) return str;
    return str.replace(/[\t\n]/g, '');
}

module.exports = { clearString };