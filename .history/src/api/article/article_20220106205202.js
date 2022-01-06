/*
 * @Author: your name
 * @Date: 2021-12-15 14:59:41
 * @LastEditTime: 2022-01-06 20:52:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\api\article\article.js
 */
import request from '@/utils/request'

export default {
  addArticle(data) {
    return request({
      url: '/api/article/addArticle',
      method: 'post',
      data: data
    })
  },
  getArticlePage(data) {
    return request({
      url: '/api/article/getArticlePage',
      method: 'post',
      data: data
    })
  },
  deleteArticleById(data) {
    return request({
      url: '/api/article/deleteArticleById',
      method: 'post',
      data: data
    })
  },
  getArticleById(data) {
    return request({
      url: '/api/article/getArticleById',
      method: 'post',
      data: data
    })
  },
  updateArticle(data) {
    return request({
      url: '/api/article/updateArticle',
      method: 'post',
      data: data
    })
  },
  getAllArticle(data) {
    return request({
      url: '/api/comment/getAllArticle',
      method: 'post',
      data: data
    })
  },
}
