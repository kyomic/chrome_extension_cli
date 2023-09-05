
import request from "./core/request";
//import Vue from 'vue'
let VueModule = (window as any).Vue;

import Element from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
//const Vue = (globalThis as any).Vue;
//const Element = (globalThis as any).ELEMENT
//console.log('vue', Vue)
export default class Application {
  constructor(root: string) {
    VueModule.config.productionTip = false;
    VueModule.use(Element)
    const vm = new VueModule({
      el: root,
      data() {
        return {
          msg: 'hello vue'
        }
      },
      async created() {
        const data = await request('https://www.baidu.com')
        console.log('data====', data)

      }
    });
  }
}
