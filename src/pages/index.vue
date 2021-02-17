<template>
  <main class="page-index">
    <!-- Vous êtes ici -->
    <b-container class="px-0" tag="nav">
      <b-breadcrumb :items="breadcrumb" />
    </b-container>

    <!-- Display books -->
    <section>
      <b-container tag="header">
        <h1>La bibliothèque d'Henri Potier</h1>
      </b-container>

      <b-jumbotron class="books-list-wrapper">
        <books-list :books="books" />
      </b-jumbotron>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      breadcrumb: [ {
        text: `Page d'accueil`,
        active: true,
      } ]
    }
  },
  head () {
    return {
      title: `La bibliothèque d'Henri Potier`,
      titleTemplate: '',
      meta: [ {
        vmid: 'description',
        name: 'description',
        content: `Bienvenue dans l'univers magique d'Henri Potier ! Prenez votre baguette et laissez-vous transplaner dans la collection de livres.`,
      } ],
    }
  },
  computed: {
    ...mapGetters('books', [ 'books' ]),
  },
}
</script>
