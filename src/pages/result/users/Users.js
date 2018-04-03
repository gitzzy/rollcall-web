import NavPills from 'components/nav/nav-pills'
import Message from './message'
import qs from 'qs'

export default {
  name: 'users',
  components: {
    NavPills,
    Message
  },
  data() {
    return {
      loading: true,
      toJSON: '',
      reqData: {
        loopId: this.$route.params.loopId,
        roomId: this.$route.params.roomId,
        page: 0,
        size: 13,
      },
      shiftData: '',
      navData: [
        {
          name: this.$route.params.room,
          href: ''
        },
        {
          name: this.$route.params.area,
          href: `/result/rooms/${this.$route.params.shiftId}&${this.$route.params.areaId}&${this.$route.params.shift}&${this.$route.params.area}`
        },
        {
          name: this.$route.params.shift,
          href: `/result/areas/${this.$route.params.shiftId}&${this.$route.params.shift}`
        },
        {
          name: '点名结果',
          href: '/result'
        }
      ],
      showAlert: false,
      alertData: ''
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
        url: `/rcTotal/user/${this.$route.params.loopId}/${this.$route.params.roomId}?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content;
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
          message: err.response.data.message,
          type: 'warning'
        })
      })
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    showDetails: function(loopId, userId) {
      this.alertData = '';
      this.$ajax({
        method: 'get',
        url: `/rcTotal/person/${loopId}/${userId}`,
        data: {}
      }).then(res => {
        res = res.data
        if (res.status === 'SUCCESS') {
          this.showAlert = !this.showAlert;
          this.alertData = res.content;
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
          message: err.response.data.message,
          type: 'warning'
        })
      })
    },
    closeAlert: function() {
      this.showAlert = !this.showAlert
    },
    reHome: function() {
       this.$router.go(-1)
    }
  }
}
