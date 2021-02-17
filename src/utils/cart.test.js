import {
  computePricesByQuantity,
  getBestDiscount,
  createQuantityOptions,
} from './cart'

describe('computePricesByQuantity', () => {
  test('should compute', () => {
    const items = [ { price: 10, quantity: 1 }, { price: 10, quantity: 3 }, { price: 5, quantity: 0 } ]

    const expected = 40
    const tested = computePricesByQuantity(items)

    expect(tested).toBe(expected)
  })
})

describe('getBestDiscount', () => {
  const offers = [
    { type: 'percentage', value: 10 },
    { type: 'minus', value: 7 },
    { type: 'slice', value: 5, sliceValue: 40 },
  ]

  test('should get best discount (percentage)', () => {
    const items = [ { price: 35, quantity: 2 } ]

    const expected = { type: 'percentage', value: 10, price: 63, diff: -7, fixedPrice: '63.00', fixedDiff: '-7.00', text: `10% de réduction` }
    const tested = getBestDiscount(offers, items)

    expect(tested).toEqual(expected)
  })

  test('should get best discount (minus)', () => {
    const items = [ { price: 30, quantity: 2 } ]

    const expected = { type: 'minus', value: 7, price: 53, diff: -7, fixedPrice: '53.00', fixedDiff: '-7.00', text: `7€ de remise immediate` }
    const tested = getBestDiscount(offers, items)

    expect(tested).toEqual(expected)
  })

  test('should get best discount (slicedValue)', () => {
    const items = [ { price: 35, quantity: 4 } ]

    const expected = { type: 'slice', value: 5, sliceValue: 40, price: 125, diff: -15, fixedPrice: '125.00', fixedDiff: '-15.00', text: `5€ par tranche de 40€` }
    const tested = getBestDiscount(offers, items)

    expect(tested).toEqual(expected)
  })
})

describe('createQuantityOptions', () => {
  test('should create options', () => {
    const expected = [ { value: 1, text: 1 }, { value: 2, text: 2 }, { value: 3, text: 3 } ]
    const tested = createQuantityOptions(3)

    expect(tested).toEqual(expected)
  })
})
