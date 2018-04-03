/**
 * Created by zzy on 2018/3/27.
 */
import qs from 'qs'
export default {
  name: 'prisoner-area',
  data() {
    return {
      loading: true,
      form: {room: ''},
      reqData: {prisonAreaId: '', prisonRoomId: '', type: 1, page: 0, size: 13},
      shiftData: '',
      roomList: []
    }
  },
  created: function() {
    this.getApi(this.reqData);
    this.getArea();
  },
  methods: {
    // 在押人员监室列表
    getApi: function (obj) {
      this.reqData.prisonAreaId = this.$route.params.id;
      this.$ajax({
        method: 'get',
        url: `/postinfo?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        this.loading = false;
        if (res.status === 'SUCCESS') {
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
          let data = res.content;
          let id = Number(this.$route.params.id);
          data.forEach(item => {
            if (item.id === id) {
              this.roomList = item.rooms.reverse()
            }
          });
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData);
    },
    loadDetails: function(id, name) {
      this.$router.push({
        name: 'prisoner-details',
        params: {
          areaId: this.$route.params.id,
          roomId: id,
          roomName: name
        }
      })
    },
    reHome: function() {
      this.$router.go(-1)
    },
  }
}
