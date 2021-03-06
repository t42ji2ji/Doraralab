import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import {
  TweenMax,
  TimelineMax,
  // eslint-disable-next-line no-unused-vars
  gsap
} from "gsap"; // Also works with TweenLite and TimelineLite
import {
  ScrollMagicPluginGsap
} from "scrollmagic-plugin-gsap";
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  faBasketballBall
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

library.add(faEnvelope, faBasketballBall);

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')