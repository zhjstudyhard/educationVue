/*
 * @Author: your name
 * @Date: 2021-12-27 20:41:25
 * @LastEditTime: 2021-12-27 22:01:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\article\comment.js
 */
import {get,post} from "../../axios";

export const addComment =(data) => post(`/api/comment/addComment`,data);
export const delComment =(data) => post(`/api/comment/delComment`,data);
export const queryComment =(data) => post(`/api/comment/queryComment`,data);
