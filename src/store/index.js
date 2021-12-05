/*
 * @Author: your name
 * @Date: 2021-12-08 21:58:22
 * @LastEditTime: 2021-12-11 16:58:10
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  // 解决刷新vuex状态丢失问题
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的assessmentData
        dict: val.dict
      }
    }
  })]
})

export default store
