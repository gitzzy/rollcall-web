/**
 * Created by zzy's on 2018-02-06.
 */
import HomeBtn from 'components/home-btn'
import json from 'json/static.json'

import Stomp from 'stompjs'

export default {
  name: 'home',
  components: {
    HomeBtn
  },
  data() {
    return {
      loading: true,
      toJSON: '',
      // status: 0-未点名，1-等待点名，2-正在点名
      monitorStatus: "0",
      monitor: null,
      monitorData: json.monitorData,
      imageData: json.imageData,

      loopId: null,

      shiftControl: json.shiftControl,
      getShift: [],

      dutyControl: json.dutyControl,
      getDuty: [],

      rangeList: [],

      form: {
        areas: ''
      },

      prisoner: {
        allCnt: 0,
        male: 0,
        female: 0,
        enter: 0,
        leavePrison: 0,
        arraign: 0,
        escort: 0,
        roomChange: 0,
        outsideHeal: 0,
        insideVisits: 0,
        insideHeal: 0,
        lawyerMeeting: 0,
        familyMeeting: 0,
        education: 0
      }
    }
  },
  created: function () {
    this.init();
  },
  methods: {
    init: function () {
      this.showMonitor(this.monitorStatus);
      this.getShiftData();
      this.getDutyData();
      this.getRanges();

      // 测试时注释
      this.getNotice();
      this.initSocket();

      let token = this.$getUrl.getUrlKey('token');
      if (token !== null) {
        this.$store.set('token', token);
      }
    },
    routerModule: function (addr) {
      this.skipRoute(addr)
    },
    showMonitor: function (num) {
      this.monitorData.forEach(item => {
        if (item.flag === `monitor-${num}`) {
          this.monitor = item
        }
      })
    },
    getNotice: function () {
      // 主动获取通知
      this.$ajax({
        method: 'get',
        url: '/index/notice',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.monitorStatus = res.content.showButton;
          this.showMonitor(this.monitorStatus);

          this.loopId = res.content.loopId;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    openNamePage: function () {
      if (this.monitorStatus !== '0') {
        window.location.href = '#loopId=' + this.loopId;
      }
    },
    getShiftData: function () {
      this.$ajax({
        method: 'get',
        url: '/rcTotal/top',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.getShift = res.content;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    getDutyData: function () {
      this.$ajax({
        method: 'get',
        url: '/rcTotal/duty',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.getDuty = res.content
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    getRanges: function () {
      this.$ajax({
        method: 'get',
        url: '/rcTotal/areas',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.rangeList = res.content;
          this.form.areas = res.content[0].id;
          this.getPrisoner(this.form.areas);
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    getPrisoner: function (value) {
      this.$ajax({
        method: 'get',
        url: `/rcTotal/prisoner/${value}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          for (let p in res.content) {
            if (res.content[p] === null) {
              res.content[p] = 0;
            }
          }
          this.prisoner = res.content;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    tableRowClassName: function ({row, rowIndex}) {
      if (row.rcStatus === '正常') {
        return ''
      } else {
        return 'statusText-warning'
      }
    },
    skipRoute: function (url) {
      if (url === 'count-form') {
        this.$alert('暂未开发，敬请期待！', '提示', {
          confirmButtonText: '确定'
        });
      } else if (url === 'sys-manage') {
        this.$store.set('activePage', '/sys-manage/user')
        this.$router.push({path: url})
      } else {
        this.$router.push({path: url})
      }
    },
    loadResultDetails: function (id, shift) {
      this.$router.push({
        name: 'areas',
        params: {
          id: id,
          shift: shift
        }
      })
    },
    loadDutyDetails: function (url, id, date) {
      this.$router.push({
        name: url,
        params: {
          id: id,
          date: date
        }
      })
    },
    initSocket: function () {
      let sock = new this.SockJS('/endpointWisely');
      sock.onopen = function () {
        console.log('open')
      };
      sock.onmessage = function (e) {
        console.log('message', e.data)
      };

      sock.onclose = function () {
        console.log('close');
      };


      let stomp = Stomp.over(sock);

      stomp.connect({}, frame => {
          // 获取用户信息
          this.$ajax({
            method: 'get',
            url: '/user/findUser',
            data: {}
          }).then(res => {
            res = res.data;
            if (res.status === 'SUCCESS') {
              let username = res.content.name;

              // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
              console.log("连接成功");
              stomp.subscribe(`/user/${username}/msg`,
                response => {
                  let returnData = JSON.parse(JSON.parse(response.body).responseMessage);

                  if (returnData.status === 'SUCCESS') {
                    let contentData = returnData.content;
                    console.log('接收到的数据：' + contentData);
                    // 执行切换点名图标的按钮
                    this.showMonitor(contentData.showButton);

                    if (contentData.loadData === '1') {
                      console.log(contentData.loadData, '统计');
                      // 统计
                      this.getPrisoner(this.form.areas);
                    } else if (contentData.loadData === '2') {
                      console.log(contentData.loadData, '点名结果');
                      // 点名结果
                      this.getShiftData();
                    } else if (contentData.loadData === '3') {
                      console.log(contentData.loadData, '值小岗');
                      // 值小岗
                      this.getDutyData();
                    }

                    // 轮次id，传给客户端
                    this.loopId = contentData.loopId;
                  }
                });
              // stomp.send("/api/v1.0/welcome", {}, JSON.stringify({ 'name': 'Tomas!!' }));
            } else {
              this.$message({showClose: true, message: res.msg, type: 'warning'})
            }
          }).catch(err => {
            this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
          });


        },
        error => {
          // 连接失败时（服务器响应 ERROR 帧）的回调方法
          console.log("连接失败");
        });
    },
    policeConfirm: function (url, loopId, shiftId, date, time, type, total, real, out, fail, repair, confirm) {
      let pcObj = {
        date: date,
        time: time,
        type: type,
        total: total,
        real: real,
        out: out,
        fail: fail,
        repair: repair,
        confirm: confirm
      };
      this.$store.set('pcObj', pcObj);
      this.$router.push({
        name: url,
        params: {
            shiftId: shiftId,
            date: date
        }
      })
    },
    repair: function (url, loopId, shiftId, date, time, type, total, real, out, fail, repair) {
       let pcObj = {
          date: date,
          time: time,
          type: type,
          total: total,
          real: real,
          out: out,
          fail: fail,
          repair: repair
       };
       this.$store.set('pcObj', pcObj);
       this.$router.push({
          name: url,
          params: {
              shiftId: shiftId,
              date: date
          }
       })
    }
  }
}
