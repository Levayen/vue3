import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "./assets/css/scss/common.scss";
import "amfe-flexible";
import "element-ui/lib/theme-chalk/index.css";
// import ElementUI from 'element-ui';
// Vue.use(ElementUI)
import { Button, Select, Row } from "element-ui";
Vue.use(Button);
Vue.use(Select);
Vue.use(Row);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const i18n = new VueI18n({ 
  locale: 'zh', // 语言标识 
  messages: { 
      'zh': require('./lang/zh'), 
      'en': require('./lang/en'),
      'jp': require('./lang/jp'),
      'han': require('./lang/han') 
    } 
  }) 

import "./global_function"

import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

// 设置语言
locale.use(lang);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
