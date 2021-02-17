/**
 * Books Store
 */

/**
 * Generates a clean state.
 *
 * @returns {{
 *  books: Array<{ isbn: string, title: string, price: number, cover: string, synopsis: string[] }>,
 * }}
 */
const state = () => ({
  books: [], // books from api
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
}

/**
 * Executes mutations with async support (called by `dispatch` function or `mapActions` helper).
 */
const actions = {
  async fetchBooks ({ dispatch }) {
    const books = await this.$api.getBooks()

    // update books
    dispatch('setBooks', books)
  },
  /**
   * @param {{
   *  commit: (mutation: keyof mutations, payload: any),
   * }} context
   * @param {ReturnType<typeof state>['books']} books
   */
  setBooks ({ commit }, books) {
    // update books
    commit('SET', [ 'books', books ])
  },
}

/**
 * Returns computed values from state.
 */
const getters = {
  /**
   * Get book object fetched from api to a suitable object with infos for UI.
   * @param {ReturnType<typeof state>} state
   */
  books ({ books }, __, rootState) {
    const { booksIds, quantities } = rootState.cart

    return books.reduce((acc, book) => {
      const quantity = quantities[book.isbn] || 0

      return ([ ...acc, {
        ...book,
        addedToCart: booksIds.includes(book.isbn),
        quantity,
        fixedPrice: book.price.toFixed(2),
        totalPrice: (book.price * (quantity || 1)).toFixed(2),
      } ])
    }, [])
  },
  /**
   * Map books object with book isbn as key and book object as value.
   * Mainly to lookup and get book data (better than array lookup).
   *
   * @param {ReturnType<typeof state>} state
   */
  booksById (_, { books }) {
    return books.reduce((acc, book) => ({ ...acc, [book.isbn]: book }), {})
  },
  /**
   * Is a book is in state?
   * @param {ReturnType<typeof state>} state
   */
  exists (_, { getBook }) {
    return function (bookId) {
      return getBook(bookId) !== null
    }
  },
  /**
   * Get book data from its id or null if not in state.
   * @param {ReturnType<typeof state>} state
   */
  getBook (_, { booksById }) {
    return function (bookId) {
      return booksById[bookId] ||null
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
