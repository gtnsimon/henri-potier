import {
  deaccent,
  filterHighlighted,
  highlight,
  mapRange,
} from './strings'

describe('deaccent', () => {
  test('should remove accents/diacritics', () => {
    const tested = deaccent('àâçèéêîôùû')
    const expected =        'aaceeeiouu'

    expect(tested).toBe(expected)
  })
})

describe('filterHighlighted', () => {
  test('should filter with highlighted prop', () => {
    const expected = [{ title: 'hello', titleHLT: 'he<b>ll</b>o' }]
    const tested = filterHighlighted(expected, 'l', [ 'title' ])

    expect(tested[0].titleHLT).toBe(expected[0].titleHLT)
  })
})

describe('highlight', () => {
  test('should highlight', () => {
    const expected = '<b>Foo</b>bar'
    const tested = highlight('Foobar', [ 'foo' ])

    expect(tested).toBe(expected)
  })

  test('should highlight once', () => {
    const expected = '<b>Foo</b>bar'
    const tested = highlight('Foobar', [ 'foo', 'fo', 'oo', 'f', 'o', 'foo' ])

    expect(tested).toBe(expected)
  })

  test('should highlight complex', () => {
    const expected = `H*enr*i Poti*er* à l'*é*col*e* *des* so*r*ci*er*s`
    const tested = highlight(`Henri Potier à l'école des sorciers`, [ 'e', 'des', 'r', 'n' ], [ '*' ])

    expect(tested).toBe(expected)
  })

  test('should group siblings delimiters', () => {
    const expected = `Henri Potier à l'école *des sorciers*`
    const tested = highlight(`Henri Potier à l'école des sorciers`, [ 'des ', 'sor', 'ciers' ], [ '*' ])

    expect(tested).toBe(expected)
  })

  test('should highlight with custom delimiters', () => {
    const expected = '*Foo___bar *baz___'
    const tested = highlight('Foobar baz', [ 'foo', 'baz' ], [ '*', '___' ])

    expect(tested).toBe(expected)
  })

  test('should not highlight', () => {
    const expected = 'Foobar'
    const tested = highlight('Foobar', [ 'rab' ])

    expect(tested).toBe(expected)
  })
})

describe('mapRange', () => {
  test('should map', () => {
    // Hen potier
    const expected1 = [ [0, 2], [6, 11] ]
    const tested1 = [0, 1, 2, 6, 7, 8, 9, 10, 11]
      .reduce(mapRange, [])

    const expected2 = [ [1, 3], [6, 8], [10, 12], [14] ]
    const tested2 = [ 1, 2, 3, 6, 7, 8, 10, 11, 12, 14 ]
      .reduce(mapRange, [])

    expect(tested1).toEqual(expected1)
    expect(tested2).toEqual(expected2)
  })
})
