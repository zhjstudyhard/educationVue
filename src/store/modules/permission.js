/*
 * @Author: your name
 * @Date: 2021-12-09 03:30:43
 * @LastEditTime: 2021-12-11 16:21:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\store\modules\permission.js
 */
import {
  constantRoutes
} from '@/router'
// import Layout from '@/views/layout/Layout'
import menu from "@/api/system/menu";
import Layout from '@/layout'
function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  try {
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === "Layout") { // Layout组件特殊处理
          route.component = Layout
        } else {
          const component = route.component
          route.component = loadView(component)
        }
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    })
    return accessedRouters
  } catch (e) {
    console.log(e)
  }
}
 // 路由懒加载
export const loadView = (component) => { 
  return resolve => {require(['@/views' + component + '.vue'], resolve)}
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({
    commit
  }, roles) {
    // 取后台路由

    const asyncRouter = await menu.getMenu()

    return new Promise(resolve => {
      const tmp = asyncRouter.data.permissionList
      const accessedRoutes = filterAsyncRouter(tmp)
      accessedRoutes.push({
        path: '*',
        redirect: '/404',
        hidden: true
      })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

