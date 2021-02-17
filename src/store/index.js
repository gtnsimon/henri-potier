// vuex: on
// we will use modules to extends store: https://nuxtjs.org/docs/2.x/directory-structure/store#modules

export const actions = {
  // fetch required data: https://nuxtjs.org/docs/2.x/directory-structure/store#the-nuxtserverinit-action
  // this action cannot be in modules' store
  async nuxtServerInit ({ dispatch }) {
    await dispatch('books/fetchBooks', null, { root: true })
  },
}
