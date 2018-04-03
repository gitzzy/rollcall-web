/**
 * Created by zzy on 2018/3/27.
 */
import qs from 'qs'
export default {
  name: 'prisoner-area',
  data() {
    return {
      loading: true,
      reqData: {prisonAreaId: '', prisonRoomId: '', type: 0, page: 0, size: 13},
      shiftData: '',
      areaList: []
    }
  },
  created: function() {
    this.getApi(this.reqData);
    this.getArea();
  },
  methods: {
    // 在押人员监区列表
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/postinfo?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        this.loading = false;
        if (res.status === 'SUCCESS') {
          res.content.content.reverse();
          this.shiftData = res.content;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    getArea: function() {
      this.$ajax({
        method: 'get',
        url: '/job/findArea',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.areaList = res.content
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    loadDetails: function(id) {
      this.$router.push({
        name: 'prisoner-rooms',
        params: {
          id: id
        }
      })
    },
    // 分页
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData);
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
  }
}
