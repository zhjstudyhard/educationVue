/*
 * @Author: your name
 * @Date: 2022-02-05 16:33:00
 * @LastEditTime: 2022-02-05 17:14:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\log\operateLog.js
 */
import request from '@/utils/request'
export default {
  //1 根据课程id获取章节和小节数据列表
  queryPageLog(data) {
    return request({
      url: '/api/operateLog/queryPageLog',
      method: 'post',
      data: data
    })
  },
  queryLogType(data) {
    return request({
      url: '/api/operateLog/queryLogType',
      method: 'post'
    })
  }

}

