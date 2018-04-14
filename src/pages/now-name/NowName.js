import {NavPills} from 'components'
import qs from 'qs'

export default {
  name: 'now-name',
  components: {
    NavPills
  },
  data() {
    return {
      loading: true,
      form: {
        time: ''
      },
      reqData: {
        start: '',
        end: '',
        jobType: '1',
        page: 0,
        size: 13,
      },
      shiftData: '',
      ranges: ''
    }
  },
  created: function () {
    this.getApi(this.reqData)
  },
  methods: {
    // 点名结果列表-带分页
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/job?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content;

          // 取范围数据，并去重之后赋给ranges
          let contentArr = res.content.content;
          for (let i = 0; i < contentArr.length; i++) {
            let roomsArr = [];
            let rooms = contentArr[i].rooms;
            // 监区排序
            rooms.sort((a, b) => {
              return a.areaId - b.areaId
            });

            for (let j = 0; j < rooms.length; j++) {
              roomsArr.push(rooms[j].areaName);
            }
            let newRoomsArr = delRepeat(roomsArr);
            contentArr[i].ranges = newRoomsArr.join(',');
          }
          this.shiftData.content = contentArr;

        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'warning'
        })
      })
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    detailsHandle: function(id) {
      this.$router.push({
        name: 'details-now-name',
        params: {id: id}
      })
    },
    add: function() {
      this.$router.push({
        name: 'add-now-name'
      })
    },
    deleteEvent: function(id) {
      let idArr = [];
      idArr.push(id);
      this.$confirm('您确定要删除该条数据吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$ajax({
              method: 'delete',
              url: '/job',
              data: idArr
          }).then(res => {
              res = res.data;
              if (res.status === 'SUCCESS') {
                  let sData = this.shiftData.content;
                  sData.forEach(item => {
                      if (item.id === id) {
                          this.shiftData.content.remove(item)
                      }
                  });

                  this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'success'
                  })
              } else {
                  this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'warning'
                  })
              }
          }).catch(err => {
              this.$message({
                  showClose: true,
                  message: '获取数据失败！',
                  type: 'warning'
              })
          })
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消删除'
          });
      });
    },

    // 工具方法
    formatDate: function() {
      if (this.form.time !== '' && this.form.time !== null) {
        this.reqData.start = getDateParam(this.form.time[0]);
        this.reqData.end = getDateParam(this.form.time[1]);
      } else {
        this.reqData.start = '';
        this.reqData.end = '';
      }
    }
  }
}

// 返回无格式日期
function getDateParam(time) {
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();

  m = m < 10 ? `0${m}` : m;
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  mm = mm < 10 ? `0${mm}` : mm;
  s = s < 10 ? `0${s}` : s;

  return `${y}${m}${d}${h}${mm}${s}`
}
// 数组去重
function delRepeat(arr) {
  let n = [arr[0]];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== n[n.length - 1]) {
      n.push(arr[i])
    }
  }
  return n;
}
