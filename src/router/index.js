import Vue from 'vue'
import Router from 'vue-router'
import {
  Login,
  Home,
  All,
  Areas,
  Rooms,
  Users,
  ResultPolice,
  Repair,
  TimedName,
  AddTimeName,
  DetailsTimeName,
  ModifyTimeName,
  DutyResult,
  DutyDetail,
  DutyQuery,
  DutyAdd,
  SingleDuty,
  DutyModify,
  NowName,
  AddNowName,
  DetailsNowName,
  Warning,
  System,
  User,
  Role,
  Device,
  Engine,
  PrisonerArea,
  PrisonerRoom,
  PrisonerDetails,
  Shift
} from 'pages'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  // base: '/',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/result',
      name: 'all',
      component: All
    },
    {
      path: '/result/areas/:id&:shift',
      name: 'areas',
      component: Areas
    },
    {
      path: '/result/rooms/:shiftId&:areaId&:shift&:area',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/result/users/:loopId&:roomId&:shiftId:areaId&:area&:shift&:room',
      name: 'users',
      component: Users
    },
    {
      path: '/result/police/:shiftId&:date',
      name: 'result-police',
      component: ResultPolice
    },
    {
      path: '/result/repair/:shiftId&:date',
      name: 'repair',
      component: Repair
    },
    {
      path: '/duty/result',
      name: 'duty-result',
      component: DutyResult
    },
    {
      path: '/duty/detail/:id&:date',
      name: 'duty-detail',
      component: DutyDetail
    },
    {
      path: '/duty',
      name: 'duty-query',
      component: DutyQuery
    },
    {
      path: '/duty/add',
      name: 'duty-add',
      component: DutyAdd
    },
    {
      path: '/duty/single/:id',
      name: 'single-duty',
      component: SingleDuty
    },
    {
      path: '/duty/modify/:id',
      name: 'duty-modify',
      component: DutyModify
    },
    {
      path: '/timed-name',
      name: 'timed-name',
      component: TimedName
    },
    {
      path: '/timed-name/add',
      name: 'add-timed-name',
      component: AddTimeName
    },
    {
      path: '/timed-name/details/:id',
      name: 'details-timed-name',
      component: DetailsTimeName
    },
    {
      path: '/timed-name/modify/:id',
      name: 'modify-timed-name',
      component: ModifyTimeName
    },
    {
      path: '/now-name',
      name: 'now-name',
      component: NowName
    },
    {
      path: '/now-name/add',
      name: 'add-now-name',
      component: AddNowName
    },
    {
      path: '/now-name/details/:id',
      name: 'details-now-name',
      component: DetailsNowName
    },
    {
      path: '/warn-manage',
      name: 'warn-manage',
      component: Warning
    },
    {
      path: '/sys-manage',
      component: System,
      children: [
        {path: '/', redirect: 'user', name: 'system'},
        {path: 'user', component: User, name: 'user'},
        {path: 'role', component: Role, name: 'role'},
        {path: 'device', component: Device, name: 'device'},
        {path: 'engine', component: Engine, name: 'engine'}
      ]
    },
    // 在押人员
    {
      path: '/prisoner/areas',
      name: 'prisoner-areas',
      component: PrisonerArea
    },
    {
      path: '/prisoner/rooms/:id',
      name: 'prisoner-rooms',
      component: PrisonerRoom
    },
    {
      path: '/prisoner/details/:areaId&:roomId&:roomName',
      name: 'prisoner-details',
      component: PrisonerDetails
    },
    {
      path: '/shift-manage',
      name: 'shift-manage',
      component: Shift
    }
  ]
});

// 路由拦截
// 不是所有版块都需要鉴权的
// 所以需要鉴权, 都会在路由meta添加添加一个字段requireLogin, 设置为true的时候
// 就必须走鉴权, 像登录页这些不要, 可以直接访问
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (this.$store.get('loginUserBaseInfo')) {
      // 判断是否登录
      let lifeTime = JSON.parse(this.$store.get('loginUserBaseInfo')).lifeTime * 1000
      let nowTime = (new Date()).getTime()
      if (nowTime < lifeTime) {
        next()
      } else {
        this.$message({
          showClose: true,
          message: '登录状态信息过期,请重新登录',
          type: 'warning'
        })
        next({
          path: '/login'
        })
      }
    } else {
      // 没登录跳转到登录
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})*/

export default router
