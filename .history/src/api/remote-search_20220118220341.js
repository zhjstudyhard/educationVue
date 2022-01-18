/*
 * @Author: your name
 * @Date: 2021-11-30 16:53:27
 * @LastEditTime: 2022-01-18 22:03:41
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\remote-search.js
 */
import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    // url: '/vue-element-admin/transaction/list',
    // method: 'get',
    // params: query
  })
}
