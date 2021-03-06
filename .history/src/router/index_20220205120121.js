import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: '??????',
      meta: {
        title: '??????',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: 'Profile',
        icon: 'user',
        noCache: true
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
    path: '/permission',
    component: Layout,
    redirect: '/permission/menus',
    alwaysShow: true, // will always show the root menu
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'lock',
      // you can set roles in root nav
    },
    children: [{
        path: 'userList',
        component: () => import('@/views/permission/userList'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'role/distribution/:id',
        component: () => import('@/views/permission/roleForm'),
        name: '????????????',
        meta: {
          title: '????????????',
        },
        hidden: true
      },
      {
        path: 'menus',
        component: () => import('@/views/permission/menus'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/permission/dictionary'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'operateLog',
        component: () => import('@/views/permission/log/operateLog'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      }
    ],
  },
  {
    path: '/operateLog',
    component: Layout,
    name: '????????????',
    meta: {
      title: '????????????'
    },
    children: [{
        path: 'operateLogList',
        component: () => import('@/views/log/operateLog'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'LoginList',
        component: () => import('@/views/log/operateLog'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      }
    ],
  },
  {
    path: '/article',
    component: Layout,
    name: '????????????',
    meta: {
      title: '????????????'
    },
    children: [{
        path: 'articleList',
        component: () => import('@/views/article/ArticleList'),
        name: '????????????',
        meta: {
          title: '????????????',
        }
      },
      {
        path: 'articleEdit',
        component: () => import('@/views/article/ArticleEdit'),
        name: '?????????',
        meta: {
          title: '?????????',
        }
      },
      {
        path: 'articleEdit/:id',
        component: () => import('@/views/article/ArticleEdit'),
        name: '????????????',
        meta: {
          title: '????????????'
        },

      },
      {
        path: 'commentList',
        component: () => import('@/views/article/CommentList'),
        name: '????????????',
        meta: {
          title: '????????????'
        },

      },
    ],
  },
  {
    path: '/message',
    component: Layout,
    name: '????????????',
    meta: {
      title: '????????????'
    },
    children: [{
      path: '/messageList',
      component: () => import('@/views/article/MessageList'),
      name: '????????????',
      meta: {
        title: '????????????'
      },
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    name: '????????????',
    meta: {
      title: '????????????'
    },
    children: [{
      path: '/teacherList',
      component: () => import('@/views/teacher/list'),
      name: '????????????',
      meta: {
        title: '????????????'
      },
    }, {
      path: '/save',
      component: () => import('@/views/teacher/save'),
      name: '????????????',
      meta: {
        title: '????????????'
      },
    }, {
      path: 'edit/:id',
      name: 'EduTeacherEdit',
      component: () => import('@/views/teacher/save'),
      meta: {
        title: '????????????',
        noCache: true
      },
      // hidden: true
    }]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '??????????????????',
    meta: { title: '??????????????????', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '??????????????????',
        component: () => import('@/views/subject/list'),
        meta: { title: '??????????????????', icon: 'table' }
      },
      {
        path: 'save',
        name: '??????????????????',  
        component: () => import('@/views/subject/save'),
        meta: { title: '??????????????????', icon: 'tree' }
      }
    ]
  },
    //??????????????????
    {
      path: '/course',
      component: Layout,
      redirect: '/course/list',
      name: '????????????',
      meta: {
        title: '????????????',
        icon: 'example'
      },
      children: [{
          path: 'list',
          name: '????????????',
          component: () => import('@/views/course/list'),
          meta: {
            title: '????????????',
            icon: 'table'
          }
        },
        {
          path: 'info',
          name: '????????????',
          component: () => import('@/views/course/info'),
          meta: {
            title: '????????????',
            icon: 'tree'
          }
        },
        {
          path: 'info/:id',
          name: 'EduCourseInfoEdit',
          component: () => import('@/views/course/info'),
          meta: {
            title: '????????????????????????',
            noCache: true
          },
          // hidden: true
        },
        {
          path: 'chapter/:id',
          name: 'EduCourseChapterEdit',
          component: () => import('@/views/course/chapter'),
          meta: {
            title: '??????????????????',
            noCache: true
          },
        },
        {
          path: 'publish/:id',
          name: 'EduCoursePublishEdit',
          component: () => import('@/views/course/publish'),
          meta: {
            title: '????????????',
            noCache: true
          },
        },
        {
          path: 'courseCommentList',
          name: 'courseCommentList',
          component: () => import('@/views/course/CourseCommentList'),
          meta: {
            title: '????????????',
            noCache: true
          },
        }
      ]
    },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
