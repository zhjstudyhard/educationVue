/*
 * @Author: your name
 * @Date: 2021-11-23 21:39:36
 * @LastEditTime: 2021-11-23 22:26:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\api\system\user.js
 */
import request from '@/utils/request'

//分页查询用户数据
export default {
    queryUserAllPage(querySearch) {
    return request({
      url: '/api/user/queryUserAllPage',
      method: 'post',
      data: querySearch
    })
  },
  //删除用户数据
  deleteUser(data) {
    return request({
      url: '/api/user/deleteUser',
      method: 'post',
      data: data
    })
  },
  //更新用户数据
  editUser(data) {
    return request({
      url: '/api/user/editUser',
      method: 'post',
      data: data
    })
  },
  //添加用户数据
  addUser(data) {
    return request({
      url: '/api/user/addUser',
      method: 'post',
      data: data
    })
  }
}

