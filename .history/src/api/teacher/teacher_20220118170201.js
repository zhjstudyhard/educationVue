/*
 * @Author: your name
 * @Date: 2022-01-17 19:55:41
 * @LastEditTime: 2022-01-18 17:02:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\teacher\teacher.js
 */
import request from '@/utils/request'
export default {
  //查询所有讲师
  // getTeacherList() {
  //   return request({
  //     url: "/eduservice/edu-teacher/findAll",
  //     method: 'get'
  //   })
  // },
  //分页查询讲师
  getTeacherListPage(data) {
    return request({
      url: `/api/teacher/pageListTeacher`,
      method: 'post',
      data: data
    })
  },
  //根据id查询讲师
  getTeacherById(data) {
    return request({
      url: `/api/teacher/getTeacherById`,
      method: "post",
      data: data
    })
  },
  //根据id删除讲师
  deleteTeacherById(data) {
    return request({
      url: `/api/teacher/deleteTeacherById`,
      method: "post",
      data: data
    })
  },
  //更新讲师
  updateTeacher(data) {
    return request({
      url: `/api/teacher/updateTeacher`,
      method: "POST",
      data: data
    })
  },
  //新增讲师
  addTeacher(data) {
    return request({
      url: `/api/teacher/addTeacher`,
      method: "POST",
      data: data
    })
  }
}
