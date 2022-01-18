/*
 * @Author: your name
 * @Date: 2022-01-18 17:41:57
 * @LastEditTime: 2022-01-18 18:47:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\subject\subject.js
 */
import request from '@/utils/request'
export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: '/api/subject/getAllSubject',
            method: 'get'
          })
    }
}
