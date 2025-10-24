function sanitizeFilename(name: string) {
  return name.replace(/[^a-z0-9-_]+/gi, '_')
}

module.exports = { sanitizeFilename }
