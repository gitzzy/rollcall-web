import NavPills from 'components/nav/nav-pills'
import qs from 'qs'

export default {
  name: 'rooms',
  components: {
    NavPills
  },
  data() {
    return {
      loading: true,
      reqData: {
        shiftId: this.$route.params.shiftId,
        areaId: this.$route.params.areaId,
        page: 0,
        size: 13,
      },
      shiftData: '',
      navData: [
        {
          name: this.$route.params.area,
          href: ''
        },
        {
          name: this.$route.params.shift,
          href: `/result/areas/${this.$route.params.shiftId}&${this.$route.params.shift}`
        },
        {
          name: '点名结果',
          href: '/result'
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
        url: `/rcTotal/room/${obj.shiftId}/${obj.areaId}?${qs.stringify(obj)}`,
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
          message: '获取数据失败！',
          type: 'warning'
        })
      })
    },
    reHome: function() {
      this.$router.go(-1)
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1
      this.getApi(this.reqData)
    },
    loadDetails: function(loopId, roomId, ranges) {
      this.$router.push({
        name: 'users',
        params: {
          loopId: loopId,
          roomId: roomId,
          shift: this.$route.params.shift,
          room: ranges,
          area: this.$route.params.area,
          areaId: this.$route.params.areaId,
          shiftId: this.$route.params.shiftId
        }
      })
    }
  }
}
