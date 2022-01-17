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
  // getTeacherListPage(current, limit, teacherQuery) {
  //   return request({
  //     url: `/eduservice/edu-teacher/pageTeacher/${current}/${limit}`,
  //     method: 'post',
  //     data: teacherQuery
  //   })
  // },
  //根据id查询讲师
  // getTeacherById(id) {
  //   return request({
  //     url: `/eduservice/edu-teacher/${id}`,
  //     method: "get"
  //   })
  // },
  //根据id删除讲师
  // removeDataById(id) {
  //   return request({
  //     url: `/eduservice/edu-teacher/delete/${id}`,
  //     method: "delete",
  //   })
  // },
  //更新讲师
  // updateTeacher(teacher) {
  //   return request({
  //     url: `/eduservice/edu-teacher/updateTeacher`,
  //     method: "PUT",
  //     data: teacher
  //   })
  // },
  //新增讲师
  addTeacher(data) {
    return request({
      url: `/api/teacher/insertTeacher`,
      method: "POST",
      data: data
    })
  }
}
