import { sortBy, sortedUniq, uniq } from 'lodash'

/**
 * Remove diacritics.
 *
 * [Thanks to its author on SO](https://stackoverflow.com/a/37511463).
 *
 * @param {string} str Input string
 * @returns {string} Input string without diacritics
 */
export function deaccent (str) {
  if (typeof str !== 'string' || !str.length) {
    return str
  }

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * @param {string} haystack String to highlight
 * @param {string[]} needles Terms to highlight
 * @param {Array<string, string>} delimiters Delimiters to use
 * @returns {string} Highlighted string or `haystack` if nothing to highlight
 */
export function highlight (haystack, needles, [ LT, GT = LT ] = [ '<b>', '</b>' ]) {
  const deaccented = deaccent(haystack)
  const delimitersLength = LT.length + GT.length

  const charsList = needles
    .map(needle => deaccented.matchAll(new RegExp(needle, 'ig')))
    .flatMap(matched => Array.from(matched))
    .flatMap(matched => Array(matched[0].length)
      .fill(matched.index)
      .map((i, j) => i + j)
    )

  return sortedUniq(sortBy(charsList))
    .reduce(mapRange, [])
    .reduce((value, [ start, end = start ], i) => {
      const endInclusive = end + 1
      const before = value.slice(0, start + (i && delimitersLength * i))
      const highlighted = LT + haystack.slice(start, endInclusive) + GT
      const after = value.slice(endInclusive + (i && delimitersLength * i))

      return before + highlighted + after
    }, haystack)
}

/**
 * Create a range from a sequence numbers.
 *
 * `Example: [ 1, 2, 3, 6, 7, 8, 10, 11, 12 ] to [ [ 1, 3 ], [ 6, 8 ], [ 10, 11 ], [ 12 ] ]`.
 *
 * Found on SO but couldn't find link.
 *
 * @param {Array<number[]>} ranges List of created ranges
 * @param {number} n Current number to add or create a range
 */
export function mapRange (ranges, n) {
  // last range or empty if not exists
  const lastRange = ranges[ranges.length - 1] || []

  // create new range if n is not following in last range
  if (!lastRange || lastRange[lastRange.length - 1] !== n - 1) {
    ranges.push([])
  }

  // push n in last range
  ranges[ranges.length - 1] = [ ...ranges[ranges.length - 1].slice(0, 1), n ]

  return ranges
}

/**
 * Filter an array of object where its `keys` match `query`.
 *
 * @param {object[]} arr Items to filter matching `query` for `keys` in
 * @param {string} query String match
 * @param {string[]} keys Object keys' to search in
 */
export function filterHighlighted (arr = [], query = null, keys = []) {
  // nothing to match
  if (!query) {
    return []
  }

  const words = uniq(deaccent(query).toLowerCase().split(' ')).filter(Boolean)

  return arr
    .filter(item => keys.map(k => deaccent(item[k]).toLowerCase()).some(v => words.every(w => v.includes(w))))
    .map(item => ({
      ...keys.reduce((acc, k) => ({
        ...acc,
        [`${k}HLT`]: highlight(item[k], words),
      }), {}),
      ...item,
    }))
}
