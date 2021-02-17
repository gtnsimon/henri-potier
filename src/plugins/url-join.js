import urljoin from 'url-join'

/**
 * Add `url-join` package to Nuxt: https://www.npmjs.com/package/url-join
 */
export default function (ctx, inject) {
  inject('urljoin', urljoin)
}
