import color from 'color'

/**
 * Add `color` package to Nuxt: https://www.npmjs.com/package/color
 */
export default function (_, inject) {
  inject('color', color)
}
