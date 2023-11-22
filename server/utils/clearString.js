function clearString (str) {
    if (Boolean(str) === false) return str;
    return str.trim().replace(/[\t\n]/g, '');
}

module.exports = { clearString };