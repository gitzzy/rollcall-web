import qs from 'qs'

export default {
  name: 'duty-result',
  data() {
    return {
      loading: true,
      form: {
        range: '',
        time: ''
      },
      reqData: {
        rcDate: '',
        page: 0,
        size: 13,
      },
      dutyData: ''
    }
  },
  created: function () {
    this.getData(this.reqData)
  },
  methods: {
    getData: function(obj) {
      this.$ajax({
        method: 'get',
        url: `/rcTotal/dutyList?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.dutyData = res.content
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

        this.reqData.rcDate = `${year}${month}${day}`
      } else {
        this.reqData.rcDate = ''
      }
    },
    tableRowClassName: function ({row, rowIndex}) {
      if (row.rcStatus === '正常') {
        return ''
      } else {
        return 'statusText-warning'
      }
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    skipRoute: function(url, id, date) {
      this.$router.push({
        name: url,
        params: {
          id: id,
          date: date
        }
      })
    },
    policeConfirm: function (url, loopId, date, time, type, total, real, out, fail, repair, confirm) {
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
          loopId: loopId
        }
      })
    }
  }
}
