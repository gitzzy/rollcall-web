import NavPills from 'components/nav/nav-pills'
import qs from 'qs'

export default {
  name: 'all',
  components: {
    NavPills
  },
  data() {
    return {
      loading: true,
      form: {
        time: '',
        type: ''
      },
      reqData: {
        time: '',
        jobType: '',
        page: 0,
        size: 13,
      },
      shiftData: '',
      // 获取到导航值 - unshift()
      navData: [
        {
          name: '点名结果',
          href: ''
        }
      ]
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
        url: `/rcTotal/shift?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content
            console.log(this.shiftData);
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
        let year = this.form.time.getFullYear();
        let month = this.form.time.getMonth() + 1;
        let day = this.form.time.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        this.reqData.time = `${year}${month}${day}`
      } else {
        this.reqData.time = ''
      }
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    loadDetails: function(id, shift) {
      this.$router.push({
        name: 'areas',
        params: {
          id: id,
          shift: shift
        }
      })
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
