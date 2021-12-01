/*
 * @Author: your name
 * @Date: 2021-11-23 17:50:07
 * @LastEditTime: 2021-11-24 15:29:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\api\system\role.js
 */
import request from '@/utils/request'

//分页查询数据字典
export default {
    queryRoleAllPage(querySearch) {
    return request({
      url: '/api/role/queryRoleAllPage',
      method: 'post',
      data: querySearch
    })
  },
  //查询所有角色
  queryRoleAll(queryRoleSearch) {
    return request({
      url: '/api/role/queryRoleAll',
      method: 'post',
      data: queryRoleSearch
    })
  },
  //删除字典
  deleteRole(data) {
    return request({
      url: '/api/role/deleteRole',
      method: 'post',
      data: data
    })
  },
  //更新字典
  editRole(data) {
    return request({
      url: '/api/role/editRole',
      method: 'post',
      data: data
    })
  },
  //添加字典
  addRole(data) {
    return request({
      url: '/api/role/addRole',
      method: 'post',
      data: data
    })
  }
}

