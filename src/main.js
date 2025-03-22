/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import VueGtag from 'vue-gtag';

const app = createApp(App)

registerPlugins(app)

app.use(VueGtag, {
  config: { id: "G-BB78LWLKLQ" }
});

app.mount('#app')
