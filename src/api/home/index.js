/**
 * Created by zzy's on 2018-02-09.
 */
/*
* 首页
*/
export default [
  {
    name: '点名结果列表-不带分页',
    method: 'getShift',
    path: '/rcTotal/top',
    type: 'get'
  },
  {
    name: '点名结果列表-带分页',
    method: 'getShiftList',
    path: '/rcTotal/shift',
    type: 'get'
  },
  {
    name: '值小岗列表查询-不带分页',
    method: 'getDuty',
    path: '/rcTotal/duty',
    type: 'get'
  },
  {
    name: '值小岗列表查询-带分页',
    method: 'getDutyList',
    path: '/rcTotal/dutyList',
    type: 'get'
  }
]
