/*
 * @Author: jubai
 * @Date: 2021-08-13 14:29:53
 * @LastEditTime: 2022-01-20 15:19:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VS-WorkSpace\vue-admin-template-master\src\api\edu\course.js
 */
import request from '@/utils/request'
export default {
  //添加课程
  addCourse(courseInfo) {
    return request({
      url: "/eduservice/edu-course/addCourse",
      method: "POST",
      data: courseInfo
    })
  },
  //根据课程id查询课程信息
  // findByCourseId(id) {
  //   return request({
  //     url: `/eduservice/edu-course/get/${id}`,
  //     method: "GET"
  //   })
  // },
  // //更新课程信息
  // updateCourse(courseInfo) {
  //   return request({
  //     url: `/eduservice/edu-course/updateCourse`,
  //     method: "put",
  //     data: courseInfo
  //   })
  // },
  // //根据id查询发布课程信息
  // getPublihCourseInfo(courseId) {
  //   return request({
  //     url: `/eduservice/edu-course/getPublishCourseById/${courseId}`,
  //     method: "GET"
  //   })
  // },
  // //最终发布课程操作
  // publihCourse(courseId) {
  //   return request({
  //     url: `/eduservice/edu-course/publishCourse/${courseId}`,
  //     method: "post"
  //   })
  // },
  // //课程分页
  // getListCourse(current, limit, courseQuery) {
  //   return request({
  //     url: `/eduservice/edu-course/pageListCourse/${current}/${limit}`,
  //     method: "post",
  //     data: courseQuery
  //   })
  // },
  // //删除课程
  // removeCourseById(id){
  //   return request({
  //     url:`/eduservice/edu-course/${id}`,
  //     method:"DELETE"
  //   })
  // }
}
