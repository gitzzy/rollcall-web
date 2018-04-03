import NavPills from 'components/nav/nav-pills'
import qs from 'qs'

export default {
  name: 'areas',
  components: {
    NavPills
  },
  data() {
    return {
      loading: true,
      reqData: {
        shiftId: this.$route.params.id,
        page: 0,
        size: 13,
      },
      shiftData: '',
      navData: [
        {
          name: this.$route.params.shift,
          href: ''
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
        url: `/rcTotal/area/${obj.shiftId}?${qs.stringify(obj)}`,
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
    loadDetails: function(shiftId, areaId, ranges) {
      this.$router.push({
        name: 'rooms',
        params: {
          shiftId: shiftId,
          areaId: areaId,
          shift: this.$route.params.shift,
          area: ranges
        }
      })
    }
  }
}
