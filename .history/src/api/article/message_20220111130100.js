/*
 * @Author: your name
 * @Date: 2022-01-11 12:58:39
 * @LastEditTime: 2022-01-11 13:01:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\article\message.js
 */
import request from '@/utils/request'

export default {
  queryMessagePage(data) {
    return request({
      url: '/api/message/queryMessagePage',
      method: 'post',
      data: data
    })
  },
  delMessagePage(data) {
    return request({
      url: '/api/message/delMessagePage',
      method: 'post',
      data: data
    })
  },

}
