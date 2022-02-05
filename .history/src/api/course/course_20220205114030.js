/*
 * @Author: jubai
 * @Date: 2021-08-13 14:29:53
 * @LastEditTime: 2022-02-05 11:40:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VS-WorkSpace\vue-admin-template-master\src\api\edu\course.js
 */
import request from '@/utils/request'
export default {
  //添加课程
  addCourse(courseInfo) {
    return request({
      url: "/api/course/addCourse",
      method: "POST",
      data: courseInfo
    })
  },
  //根据课程id查询课程信息
  findByCourseId(data) {
    return request({
      url: `/api/course/findByCourseId`,
      method: "post",
      data: data
    })
  },
  //更新课程信息
  updateCourse(courseInfo) {
    return request({
      url: `/api/course/updateCourse`,
      method: "post",
      data: courseInfo
    })
  },
  //根据id查询发布课程信息
  getPublihCourseInfo(data) {
    return request({
      url: `/api/course/getPublishCourseById`,
      method: "post",
      data: data
    })
  },
  //最终发布课程操作
  publihCourse(data) {
    return request({
      url: `/api/course/publishCourse`,
      method: "post",
      data: data
    })
  },
  //课程分页
  getListCourse(data) {
    return request({
      url: `/api/course/pageListCourse`,
      method: "post",
      data: data
    })
  },
  //删除课程
  removeCourseById(data) {
    return request({
      url: `/api/course/removeCourseById`,
      method: "POST",
      data: data
    })
  },
  getAllCourse(data) {
    return request({
      url: `/api/course/getAllCourse`,
      method: "POST",
      data: data
    })
  }
}
