function clearString(str) {
  if (typeof str !== 'string' || Boolean(str) === false) return str
  const trimmed = str.trim()
  return trimmed.replace(/[\t\n\r]/g, '')
}

module.exports = { clearString }
