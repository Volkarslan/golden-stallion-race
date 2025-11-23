import locale from '@/locales/en.json'

/**
 * Retrieves a value from en.json using dot-notation path.
 * This helper is intentionally simple and framework-agnostic.
 *
 * Example:
 * getText('header.title')
 * -> "Golden Stallion Race"
 *
 * @param {string} path - Dot-notated key path (e.g. "header.buttons.start")
 * @returns {string | null} Value if found, otherwise null
 */
export function getText(path) {
  if (!path) return null

  return path
    .split('.')
    .reduce((acc, key) => acc?.[key], locale) ?? null
}
