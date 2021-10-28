const isProd = process.env.NODE_ENV === 'production'

export default {
  components: true,                 // Scan and auto import components
  telemetry: false,                 // https://github.com/nuxt/telemetry#opting-out

  srcDir: 'src/',                   // Define the source directory of your Nuxt.js application
  dir: {                            // Define the custom directories for your Nuxt.js application
    middleware: 'middlewares',
    static: '../static',
  },

  head: {
    titleTemplate: `%s - La bibliothèque d'Henri Potier`,
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://storage.googleapis.com' },
    ]
  },

  css: [
    '~/assets/css/styles.scss',
  ],

  plugins: [                        // The plugins property lets you add vue.js plugins easily to your main application.
    '~/plugins/color.js',
    '~/plugins/url-join.js',
    '~/plugins/api.js',
  ],

  modules: [                        // Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations.
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  axios: {                          // https://axios.nuxtjs.org/
    progress: false,
  },

  bootstrapVue: {                   // https://bootstrap-vue.org/
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      'BadgePlugin',
      'BreadcrumbPlugin',
      'ButtonPlugin',
      'CardPlugin',
      'DropdownPlugin',
      'FormInputPlugin',
      'FormSelectPlugin',
      'IconsPlugin',
      'JumbotronPlugin',
      'LayoutPlugin',
      'NavPlugin',
      'NavbarPlugin',
      'SpinnerPlugin',
    ],
  },

  build: {
    extractCSS: isProd,
    publicPath: (isProd && process.env.PUBLIC_PATH) || '/_nuxt/',
  },

  vue: {
    config: {
      productionTip: false,
    },
  },
}
