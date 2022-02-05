/*
 * @Author: your name
 * @Date: 2021-12-27 20:41:25
 * @LastEditTime: 2022-02-05 11:17:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\article\comment.js
 */
// import {get,post} from "../../axios";

// export const addComment =(data) => post(`/api/comment/addComment`,data);
// export const delComment =(data) => post(`/api/comment/delComment`,data);
// export const queryComment =(data) => post(`/api/comment/queryComment`,data);
import request from '@/utils/request'

export default {
  queryAllComment(data) {
    return request({
      url: '/api/comment/queryAllComment',
      method: 'post',
      data: data
    })
  },
  delComment(data) {
    return request({
      url: '/api/comment/delComment',
      method: 'post',
      data: data
    })
  },
  queryCourseAllComment(data) {
    return request({
      url: '/api/comment/queryCourseAllComment',
      method: 'post',
      data: data
    })
  },
  //   getArticlePage(data) {
  //     return request({
  //       url: '/api/article/getArticlePage',
  //       method: 'post',
  //       data: data
  //     })
  //   },
  //   deleteArticleById(data) {
  //     return request({
  //       url: '/api/article/deleteArticleById',
  //       method: 'post',
  //       data: data
  //     })
  //   },
  //   getArticleById(data) {
  //     return request({
  //       url: '/api/article/getArticleById',
  //       method: 'post',
  //       data: data
  //     })
  //   },
  //   updateArticle(data) {
  //     return request({
  //       url: '/api/article/updateArticle',
  //       method: 'post',
  //       data: data
  //     })
  //   },
}
