/*
 * @Author: your name
 * @Date: 2021-11-30 16:53:27
 * @LastEditTime: 2021-12-11 16:48:06
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\utils\permission.js
 */
import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

// 用来控制按钮的显示
export function hasBtnPermission(permission) {
  const myBtns = store.getters.buttons
  return myBtns.indexOf(permission) > -1
}
