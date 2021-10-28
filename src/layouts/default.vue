<template>
  <div class="layout">
    <!-- Header -->
    <layout-nav
      v-model="query"
      :suggestions-books="suggestedBooks"
    />

    <!-- Page content -->
    <nuxt class="layout-page" />

    <footer class="gtnsimon">
      <b-container>
        <p class="gtnsimon__by">Proposé par <a href="https://gtnsimon.dev/?gh=henri-potier" target="_blank" rel="noopener noreferrer" title="Travailler avec Gaëtan SIMON">Gaëtan SIMON</a>, <em>développeur web passionné</em> - <a href="https://github.com/gtnsimon/henri-potier" target="_blank" title="Consulter le code source du projet">GitHub</a></p>
      </b-container>
    </footer>

    <!-- Cart feedback on item added on top of content -->
    <cart-feedback
      @close="clearFeedback"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterHighlighted } from '~/utils/strings'

export default {
  name: 'Layout',
  data () {
    return {
      suggestionsBooks: [],
      query: '',
    }
  },
  head () {
    return {
      bodyAttrs: {
        // lock body scroll if cart-feedback is opened
        class: [ (this.hasFeedback && 'overflow-hidden') || '' ]
      },
    }
  },
  computed: {
    ...mapGetters('books', [ 'books' ]),
    ...mapGetters('cart', [ 'feedback', 'hasFeedback' ]),
    suggestedBooks () {
      if (!this.query) {
        return this.books
      }

      return filterHighlighted(this.books, this.query, [ 'title' ])
    },
  },
  methods: {
    ...mapActions('cart', [ 'clearFeedback' ]),
  }
}
</script>
