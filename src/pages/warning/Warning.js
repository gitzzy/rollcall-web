/**
 * Created by zzy's on 2018-03-23.
 */
import qs from 'qs'

export default {
  name: 'warning',
  data() {
    return {
      loading: true,
      form: {
        time: '',
        type: ''
      },
      reqData: {
        eventTime: '',
        eventType: '',
        page: 0,
        size: 13,
      },
      shiftData: ''
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
        url: `/eventwarn?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content
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
    formatDate: function() {
      if (this.form.time !== '' && this.form.time !== null) {
        this.reqData.eventTime = getDateParam(this.form.time);
      } else {
        this.reqData.eventTime = ''
      }
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    }
  }
}


// 返回无格式日期
function getDateParam(time) {
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();

  m = m < 10 ? `0${m}` : m;
  d = d < 10 ? `0${d}` : d;

  return `${y}${m}${d}`
}
