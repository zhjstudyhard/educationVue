/*
 * @Author: your name
 * @Date: 2021-08-15 21:13:49
 * @LastEditTime: 2022-01-21 19:03:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VS-WorkSpace\vue-admin-template-master\src\api\edu\video.js
 */
import request from '@/utils/request'
export default {

  //添加小节
  addVideo(video) {
    return request({
      url: '/api/video/addVideo',
      method: 'post',
      data: video
    })
  },

  // //删除小节
  // deleteVideo(id) {
  //   return request({
  //     url: '/eduservice/edu-video/' + id,
  //     method: 'delete'
  //   })
  // },
  //根据id查询小节信息
  getVideo(data) {
    return request({
      url: `/api/video/getVideoById`,
      method: "post",
      data:data
    })
  },
  // //更改小节信息
  // updateVideo(video) {
  //   return request({
  //     url: "/eduservice/edu-video/updateVideo",
  //     method: "put",
  //     data: video
  //   })
  // },
  // //删除视频
  // deleteAliyunvod(id) {
  //   return request({
  //     url: '/eduvod/service-video/removeAlyVideo/' + id,
  //     method: 'delete'
  //   })
  // }
}
