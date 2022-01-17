import { login, logout, getInfo } from '@/api/userLogin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from '@/store'
const state = {
  token: getToken(),
  username: '',
  avatar: '',
  gmtCreate:"",
  // introduction: '',
  buttons: [],
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_INTRODUCTION: (state, introduction) => {
  //   state.introduction = introduction
  // },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_GMTCREATE: (state, gmtCreate) => {
    state.gmtCreate = gmtCreate
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  setToken({ commit },token) {
    return new Promise(resolve => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  },
  setAvatar({ commit },avatar) {
    return new Promise(resolve => {
      commit('SET_AVATAR', avatar)
      // setToken(token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password,isAdmin:1 }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // const { data } = response

        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }

        // const { roles, name, avatar, introduction } = data

        // // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        // debugger
        const data = response.data.data
        // console.log("roles: ",data)
        if (data.roles && data.roles.length > 0) {
           // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }

        const buttonAuthList = []
        data.permissionValueList.forEach(button => {
          buttonAuthList.push(button)
        })

        commit('SET_NAME', data.user.username)
        commit('SET_AVATAR', data.user.avatar)
        commit('SET_BUTTONS', buttonAuthList)
        commit('SET_GMTCREATE', data.user.gmtCreate)
        // commit('SET_ROLES', roles)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_BUTTONS', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
