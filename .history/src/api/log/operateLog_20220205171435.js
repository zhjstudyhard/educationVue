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

