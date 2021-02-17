<template>
  <div
    v-show="show"
    class="dropdown b-dropdown"
  >
    <ul
      :class="[ show && 'show' ]"
      class="dropdown-menu"
      role="menu"
    >
      <template v-if="suggestions.length">
        <!-- Count matched suggestions -->
        <b-dropdown-header>
          {{ `${suggestions.length} suggestion${suggestions.length >= 2 ? 's' : ''}` }}
        </b-dropdown-header>

        <!-- List suggestions -->
        <b-dropdown-item
          v-for="suggestion in suggestions"
          :key="suggestion[keyValue]"
          :link-class="suggestionClassname"
          :title="suggestion.title"
          :to="suggestionNavMethod(suggestion)"
        >
          <!-- Presentation for cover/title/action is left to component which use suggestions-list component -->
          <!-- slots are provided with the current suggestion data -->
          <slot name="cover" v-bind="suggestion" />
          <slot name="title" v-bind="suggestion" />
          <slot name="action" v-bind="suggestion" />
        </b-dropdown-item>
      </template>

      <!-- No match fallback -->
      <b-dropdown-text v-else>
        <slot name="empty">
          Aucune suggestion
        </slot>
      </b-dropdown-text>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SuggestionsList',
  props: {
    /**
     * Key to use from suggestion item to render dropdown item.
     */
    keyValue: {
      type: String,
      default: 'id',
    },
    suggestionClassname: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    suggestions: {
      type: Array,
      default: () => ([]),
    },
    /**
     * Format link to navigate to item.
     */
    suggestionNavMethod: {
      type: Function,
      default: suggestion => undefined,
    },
  },
}
</script>
