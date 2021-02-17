/**
 * Cart Store
 */
import { clamp, difference, uniq, sum } from 'lodash'
import { computePricesByQuantity } from '~/utils/cart'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5
export const DEFAULT_QUANTITY = 1

/**
 * Generates a clean state.
 *
 * @returns {{
*   booksIds: string[],
 * }}
 */
const state = () => ({
  booksIds: [], // books ids added to cart
  quantities: {},
  feedback: {
    added: [],
  },
})

/**
 * Updates state using mutations (called by `commit` function).
 */
const mutations = {
  /**
   * Replaces state `key` by the given `value`.
   *
   * @param {ReturnType<typeof state>} state
   * @param {[ keyof ReturnType<typeof state>, ReturnType<typeof state>[keyof ReturnType<typeof state>] ]} payload
   */
  SET (state, [ key, value ]) {
    // set key if already exists
    if (state[key]) {
      state[key] = value
    }
  },
  /**
   * Set books' state in one time.
   * It is a conveniant function to avoid multiple mutations that are related.
   * If we rollback state from vue devtools books, quantities and feedback will be up to date (we don't have to rollback 3 times but once).
   */
  SET_BOOKS (state, [ booksIds = [], quantities = {}, feedback = true ]) {
    // compute feedback (only books added)
    if (feedback && booksIds.length) {
      const added = [
        ...difference(booksIds, state.booksIds), // get added books
        ...Object.entries(quantities)            // get modified books
          .reduce((acc, [ bookId, quantity ]) => ([
            ...acc,
            state.quantities[bookId] && state.quantities[bookId] !== quantity && bookId,
          ]), [])
          .filter(Boolean)
      ]

      // update feedback
      state.feedback = { ...state.feedback, added }
    }

    state.booksIds = booksIds
    state.quantities = quantities
  },
  /**
   * Remove books from cart with exising quantities.
   */
  REMOVE_BOOKS (state, [ booksIds ]) {
    // remove books ids from cart
    const _booksIds = difference(state.booksIds, booksIds)
    const quantities = { ...state.quantities }

    // remove book's quantity
    booksIds.forEach(bookId => {
      delete quantities[bookId]
    })

    state.booksIds = _booksIds
    state.quantities = quantities
  },
  /**
   * Trash a cart (in reference to Harry Potter spell).
   */
  OBLIVIATE (state) {
    state.booksIds = []
    state.quantities = {}
  },
}

/**
 * Executes mutations with async support (called by `dispatch` function or `mapActions` helper).
 */
const actions = {
  /**
   * @param {{
   *  commit: (mutation: keyof mutations, payload: any),
   * }} context
   * @param {ReturnType<typeof state>['booksIds']} booksIds
   */
  addToCart ({ commit, state }, [ booksIds, quantity = DEFAULT_QUANTITY, feedback = true ]) {
    // append books ids to cart, removing duplicates
    const _booksIds = uniq([ ...state.booksIds, ...booksIds ])

    // update books if not already in cart or quantity has changed
    if (_booksIds.some(bookId => !state.booksIds.includes(bookId) || (state.quantities[bookId] && state.quantities[bookId] !== quantity))) {
      // update quantities with the new one for all books
      // clamped to min and max allowed quantities
      const quantities = {
        ...state.quantities,
        ...booksIds.reduce((acc, bookId) => ({ ...acc, [bookId]: clamp(quantity, MIN_QUANTITY, MAX_QUANTITY) }), {}),
      }

      // commit updates
      commit('SET_BOOKS', [ _booksIds, quantities, feedback ])
    }
  },
  /**
   * @param {{
   *  commit: (mutation: keyof mutations, payload: any),
   * }} context
   * @param {ReturnType<typeof state>['booksIds']} booksIds
   */
  removeFromCart ({ commit }, [ booksIds ]) {
    // update booksIds
    commit('REMOVE_BOOKS', [ booksIds ])
  },
  /**
   * @param {{
   *  commit: (mutation: keyof mutations, payload: any),
   * }} context
   */
  obliviate ({ commit, state }) {
    // empty booksIds if cart is not yet empty
    if (state.booksIds.length) {
      commit('OBLIVIATE')
    }
  },
  /**
   * Clear feedback data.
   * Mainly used to close <cart-feedback />
   */
  clearFeedback ({ commit }) {
    commit('SET', [ 'feedback', state().feedback ])
  },
}

/**
 * Returns computed values from state.
 */
const getters = {
  /**
   * Returs books ids in cart to book object.
   * @param {ReturnType<typeof state>} state
   */
  books ({ booksIds }, __, ___, rootGetters) {
    return booksIds.reduce((books, bookId) => ([ ...books, rootGetters['books/getBook'](bookId) ]), [])
  },
  /**
   * Returns number of books in cart.
   * @param {ReturnType<typeof state>} state
   */
  count ({ quantities }) {
    return sum(Object.values(quantities))
  },
  /**
   * Price of the cart.
   * @param {ReturnType<typeof state>} state
   */
  price (_, { books }) {
    return computePricesByQuantity(books)
  },
  /**
   * Returns feedback books ids to book object.
   * @param {ReturnType<typeof state>} state
   */
  feedback ({ feedback }, __, ___, rootGetters) {
    return Object.entries(feedback)
      .reduce((acc, [ k, booksIds ]) => ({
        ...acc,
        [k]: booksIds.map(bookId => rootGetters['books/getBook'](bookId)),
      }), {})
  },
  /**
   * Look if feedback contains data.
   */
  hasFeedback (_, { feedback }) {
    return [ 'added' ].some(k => feedback[k].length)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
