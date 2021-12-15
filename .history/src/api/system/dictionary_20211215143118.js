/*
 * @Author: your name
 * @Date: 2021-11-22 15:07:10
 * @LastEditTime: 2021-12-15 14:31:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\api\system\dictionary.js
 */
import request from '@/utils/request'

//分页查询数据字典
export default {
  queryDictionaryPage(querySearch) {
    return request({
      url: '/api/dictionary/queryDictionaryAllPage',
      method: 'post',
      data: querySearch
    })
  },
  //删除字典
  deleteDictionary(data) {
    return request({
      url: '/api/dictionary/deletedDictionary',
      method: 'post',
      data: data
    })
  },
  //更新字典
  editDictionary(data) {
    return request({
      url: '/api/dictionary/editDictionary',
      method: 'post',
      data: data
    })
  },
  //添加字典
  addDictionary(data) {
    return request({
      url: '/api/dictionary/addDictionary',
      method: 'post',
      data: data
    })
  },
  //根据类型查询字典
  queryDictionaryByType(data) {
    return request({
      url: '/api/dictionary/queryDictionaryByType',
      method: 'post',
      data: data
    })
  }
}
