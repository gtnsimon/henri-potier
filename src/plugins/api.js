/**
 * Light api helper to interact with endpoints.
 */
import { getBestDiscount } from '~/utils/cart'

// get primary color on cover
// api would return those colors based on cover but it is hardcoded for demo purpose
const BOOKS_COLORS = {
  'c8fabf68-8374-48fe-a7ea-a00ccd07afff': '#20497D',
  'a460afed-e5e7-4e39-a39d-c885c05db861': '#B42C16',
  'fcd1e6fa-a63f-4f75-9da4-b560020b6acc': '#2A35FF',
  'c30968db-cb1d-442e-ad0f-80e37c077f89': '#A31A2B',
  '78ee5f25-b84f-45f7-bf33-6c7b30f1b502': '#91862A',
  'cef179f2-7cbc-41d6-94ca-ecd23d9f7fd6': '#1D6734',
  'bbcee412-be64-4a0c-bf1e-315977acd924': '#486680',
}

export default function (ctx, inject) {
  const { $axios, $urljoin, store } = ctx

  // lightweight Publicis Sapient test API helper
  const api = {
    /**
     * Fetch books from Publicis Sapient test API.
     * Its add prop `color` to display fancies colors on UI.
     */
    getBooks () {
      return $axios.$get()
        .then(books => books.map(book => ({
          ...book,
          color: BOOKS_COLORS[book.isbn],
        })))
    },
    /**
     * Get the best offer (called discount) from Publicis Sapient test API for given books prices' and quantities'
     * @param  {...object[]} books
     */
    getDiscount (...books) {
      if (!books.length) {
        return Promise.resolve(null)
      }

      // get book id * book quantity
      const booksIds = books.flatMap(({ isbn, quantity }) => Array(quantity).fill(isbn)).join(',')
      // Publicis Sapient test endpoint
      const url = $urljoin(booksIds, '/commercialOffers')

      // fetch offers and compute them to get a single discount
      return $axios.$get(url)
        .then(({ offers }) => getBestDiscount(offers, books))
    },
  }

  inject('api', api)
}
