/*
 * @Author: your name
 * @Date: 2021-08-15 21:15:01
 * @LastEditTime: 2021-08-16 13:44:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VS-WorkSpace\vue-admin-template-master\src\api\edu\chapter.js
 */
import request from '@/utils/request'
export default {
    //1 根据课程id获取章节和小节数据列表
    getAllChapterVideo(courseId) {
        return request({
            url: '/eduservice/edu-chapter/getChapterVideo/'+courseId,
            method: 'get'
          })
    },
    //添加章节
    addChapter(chapter) {
        return request({
            url: '/eduservice/edu-chapter/addChapter',
            method: 'post',
            data: chapter
          })
    },
    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: '/eduservice/edu-chapter/getChapterInfo/'+chapterId,
            method: 'get'
          })
    },
    //修改章节
    updateChapter(chapter) {
        return request({
            url: '/eduservice/edu-chapter/updateChapter',
            method: 'post',
            data: chapter
          })
    },
    //删除章节
    deleteChapter(chapterId) {
        return request({
            url: '/eduservice/edu-chapter/'+chapterId,
            method: 'delete'
          })
    },
}