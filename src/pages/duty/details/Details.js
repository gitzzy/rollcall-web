import qs from 'qs'

export default {
  name: 'duty-details',
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
  mounted: function () {
    let reg = new RegExp('-', 'ig');
    this.reqData.rcDate = this.$route.params.date.replace(reg, '');

    this.getData(this.reqData)
  },
  methods: {
    getData: function(obj) {
      this.$ajax({
        method: 'get',
        url: `/rcTotal/duty/${this.$route.params.id}?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.dutyData = res.content;
          this.loading = false;
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
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.go(-1)
    },
  }
}
