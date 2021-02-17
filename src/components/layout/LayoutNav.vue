<template>
  <b-navbar
    class="layout-nav"
    type="dark"
    variant="primary"
  >
    <b-navbar-brand :to="{ name: 'index' }">Henri Potier</b-navbar-brand>

    <b-navbar-nav
      ref="navSearch"
      v-click-outside="clickOutside"
      class="layout-nav__search"
      tag="div"
    >
      <!-- Search form -->
      <form
        @submit.prevent="onSubmit"
        class="form-inline layout-nav__search__form"
      >
        <!-- Search label for accessibility -->
        <label
          for="search"
          class="text-white accio-label"
        >Accio livre</label>

        <!-- Input to search a bookn -->
        <b-form-input
          @input="$emit('search', $event)"
          @focus="show = true"
          id="search"
          autocomplete="off"
          :value="query"
          placeholder="Rechercher un livre"
        />

        <!-- Toggle suggestions list without triggering input keyboard -->
        <b-button title="Lancer la recherche" type="submit" variant="yellow">
          <b-icon icon="lightning" />
        </b-button>
      </form>

      <!-- List of suggested books -->
      <books-suggestions-list
        :books="suggestionsBooks"
        :show="show"
      />
    </b-navbar-nav>

    <!-- Cart with badge to indicate number of items -->
    <b-navbar-nav class="layout-nav__cart" tag="div">
      <b-button
        class="layout-nav__btn-cart"
        title="Consulter mon panier"
        :to="{ name: 'cart' }"
        variant="outline-light"
      >
        <b-icon font-scale="2" icon="cart" />

        <span
          v-if="count"
          class="layout-nav__btn-cart__badge"
        >
          <b-badge pill variant="info">{{ count }}</b-badge>
        </span>
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'

export default {
  name: 'LayoutNav',
  model: {
    prop: 'query',
    event: 'search',
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    suggestionsBooks: {
      type: Array,
      default: () => ([]),
    },
    query: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      show: false,
      // options for click-outside (allowing to close suggestions on body click)
      clickOutside: {
        handler: this.onClickOutside,
        middleware: this.isOutsideClick,
        events: [ 'mousedown' ],
      },
    }
  },
  computed: {
    ...mapGetters('cart', [ 'count' ]),
  },
  watch: {
    // close suggestions on route change
    '$route.fullPath' (cv, pv) {
      if (pv && this.show && cv !== pv) {
        this.show = false
      }
    },
  },
  methods: {
    /**
     * Forward event for click-outside if not our element or one of its children.
     */
    isOutsideClick ($event) {
      return this.show && (
        $event.target !== this.$refs.navSearch.$el ||
        !this.$refs.navSearch.$el.contains($event.target)
      )
    },
    onClickOutside () {
      this.show = false
    },
    onSubmit () {
      this.show = !this.show
    },
  }
}
</script>
