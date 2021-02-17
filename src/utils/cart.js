import { sortBy, sum } from 'lodash'

/**
 * Get cart price for given items (based on `price` and `quantity`).
 *
 * @param {{ price: number, quantity: number }} items
 */
export function computePricesByQuantity (items = []) {
  return sum(items.flatMap(({ price = 0, quantity = 0 }) => price * quantity))
}

/**
 * Search for best discount proposed by `offers` to apply on `items`.
 *
 * @param {object[]} offers List of offers proposed
 * @param {object[]} items List of items used to compute best offer
 */
export function getBestDiscount (offers, items) {
  // get cart price
  const totalPrice = computePricesByQuantity(items)
  // get offers with a price after applied offer
  const discounts = offers.map(offer => mapOfferToDiscount(offer, totalPrice))
  // /!\ sort discounts by price ascending as find returns the first value matching assertion
  // get the first found discount or null if none stricly under totalPrice
  // it is not common to display a discount with the same price of base item
  const bestDiscount = sortBy(discounts, 'price').find(({ price }) => price < totalPrice) || null

  return bestDiscount
}

function mapOfferToDiscount (offer, price) {
  // clone offer with discount info
  // if no offer match cases price will be the same as initial price
  const _offer = { ...offer, text: '-', price }
  // get offer content
  const { type, value, sliceValue } = _offer

  switch (type) {
    // La première offre identifiée par un type ‘percentage’ est une réduction s’appliquant sur le prix de l’ensemble des livres.
    // Le montant de la réduction est dans ‘value’;
    case 'percentage':
      _offer.text = `${value}% de réduction`
      _offer.price = price * (1 - (value / 100))
      break
    // La deuxième offre identifiée par un type ‘minus’ est une déduction directement applicable en caisse d’un montant de ‘value’;
    case 'minus':
      _offer.text = `${value}€ de remise immediate`
      _offer.price = price - value
      break
    // La troisième offre identifiée par un type ‘slice’ est un remboursement par tranche d’achat.
    // On rembourse ‘value’ par tranche de ‘sliceValue’.
    case 'slice':
      _offer.text = `${value}€ par tranche de ${sliceValue}€`
      _offer.price = price - (value * Math.floor(price / sliceValue))
      break
  }

  // compute money saved
  _offer.diff = (price - _offer.price) * -1

  // round to 2 digits for display
  _offer.fixedPrice = _offer.price.toFixed(2)
  _offer.fixedDiff = _offer.diff.toFixed(2)

  return _offer
}

/**
 * Create options for <b-select />.
 * Value and text is quantity number.
 */
export function createQuantityOptions (length) {
  return Array(length)
    .fill(1)
    .map((v, i) => v + i)
    .map(value => ({
      value,
      text: value,
    }))
}
