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
      name: '首页',
      meta: {
        title: '首页',
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
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'lock',
      // you can set roles in root nav
    },
    children: [{
        path: 'userList',
        component: () => import('@/views/permission/userList'),
        name: '用户管理',
        meta: {
          title: '用户管理',
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: '角色管理',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: 'role/distribution/:id',
        component: () => import('@/views/permission/roleForm'),
        name: '角色权限',
        meta: {
          title: '角色权限',
        },
        hidden: true
      },
      {
        path: 'menus',
        component: () => import('@/views/permission/menus'),
        name: '菜单管理',
        meta: {
          title: '菜单管理',
        }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/permission/dictionary'),
        name: '数据字典',
        meta: {
          title: '数据字典',
        }
      },
      {
        path: 'operateLog',
        component: () => import('@/views/log/operateLog'),
        name: '操作日志',
        meta: {
          title: '操作日志',
        }
      },
      {
        path: 'operateLoginLog',
        component: () => import('@/views/log/operateLoginLog'),
        name: '登录日志',
        meta: {
          title: '登录日志',
        }
      }
    ],
  },
  {
    path: '/operateLog',
    component: Layout,
    name: '日志管理',
    meta: {
      title: '日志管理'
    },
    children: [{
        path: 'operateLogList',
        component: () => import('@/views/log/operateLog'),
        name: '操作日志',
        meta: {
          title: '操作日志',
        }
      },
      {
        path: 'LoginList',
        component: () => import('@/views/log/operateLog'),
        name: '登录日志',
        meta: {
          title: '登录日志',
        }
      }
    ],
  },
  {
    path: '/article',
    component: Layout,
    name: '文章管理',
    meta: {
      title: '文章管理'
    },
    children: [{
        path: 'articleList',
        component: () => import('@/views/article/ArticleList'),
        name: '文章列表',
        meta: {
          title: '文章列表',
        }
      },
      {
        path: 'articleEdit',
        component: () => import('@/views/article/ArticleEdit'),
        name: '写文章',
        meta: {
          title: '写文章',
        }
      },
      {
        path: 'articleEdit/:id',
        component: () => import('@/views/article/ArticleEdit'),
        name: '文章编辑',
        meta: {
          title: '文章编辑'
        },

      },
      {
        path: 'commentList',
        component: () => import('@/views/article/CommentList'),
        name: '评论列表',
        meta: {
          title: '评论管理'
        },

      },
    ],
  },
  {
    path: '/message',
    component: Layout,
    name: '消息管理',
    meta: {
      title: '消息管理'
    },
    children: [{
      path: '/messageList',
      component: () => import('@/views/article/MessageList'),
      name: '消息列表',
      meta: {
        title: '消息列表'
      },
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    name: '讲师管理',
    meta: {
      title: '讲师管理'
    },
    children: [{
      path: '/teacherList',
      component: () => import('@/views/teacher/list'),
      name: '讲师列表',
      meta: {
        title: '讲师列表'
      },
    }, {
      path: '/save',
      component: () => import('@/views/teacher/save'),
      name: '新增讲师',
      meta: {
        title: '新增讲师'
      },
    }, {
      path: 'edit/:id',
      name: 'EduTeacherEdit',
      component: () => import('@/views/teacher/save'),
      meta: {
        title: '编辑讲师',
        noCache: true
      },
      // hidden: true
    }]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加课程分类',  
        component: () => import('@/views/subject/save'),
        meta: { title: '添加课程分类', icon: 'tree' }
      }
    ]
  },
    //课程管理模块
    {
      path: '/course',
      component: Layout,
      redirect: '/course/list',
      name: '课程管理',
      meta: {
        title: '课程管理',
        icon: 'example'
      },
      children: [{
          path: 'list',
          name: '课程列表',
          component: () => import('@/views/course/list'),
          meta: {
            title: '课程列表',
            icon: 'table'
          }
        },
        {
          path: 'info',
          name: '添加课程',
          component: () => import('@/views/course/info'),
          meta: {
            title: '添加课程',
            icon: 'tree'
          }
        },
        {
          path: 'info/:id',
          name: 'EduCourseInfoEdit',
          component: () => import('@/views/course/info'),
          meta: {
            title: '编辑课程基本信息',
            noCache: true
          },
          // hidden: true
        },
        {
          path: 'chapter/:id',
          name: 'EduCourseChapterEdit',
          component: () => import('@/views/course/chapter'),
          meta: {
            title: '编辑课程大纲',
            noCache: true
          },
        },
        {
          path: 'publish/:id',
          name: 'EduCoursePublishEdit',
          component: () => import('@/views/course/publish'),
          meta: {
            title: '发布课程',
            noCache: true
          },
        },
        {
          path: 'courseCommentList',
          name: 'courseCommentList',
          component: () => import('@/views/course/CourseCommentList'),
          meta: {
            title: '发布课程',
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
