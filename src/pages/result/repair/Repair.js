/**
 * Created by zzy's on 2018-03-20.
 */
export default {
  name: 'repair',
  data() {
    return {
      loading: true,
      multipleSelection: [],
      shiftData: [],
      resObj: null
    }
  },
  created: function () {
    this.resObj = this.$store.get('pcObj');
    this.getData();
  },
  methods: {
    getData: function() {
      let date = this.$route.params.date.replace(/-/g, '');
      this.$ajax({
        method: 'get',
        url: `/loop/${this.$route.params.shiftId}/${date}/repair`,
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
    handleRepair: function() {
      let rooms = [];
      this.multipleSelection.forEach(item => {
        let repairObj = {
          loopId: item.rcLoopId,
          areaId: item.areaId,
          roomId: item.roomId,
          userId: item.userId
        };
        rooms.push(repairObj);
      });

      this.$ajax({
        method: 'post',
        url: '/loop/repairs',
        data: rooms
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          if (res.content.state === true) {
            this.$message({
              showClose: true,
              message: res.content.tips,
              duration: 1000,
              type: 'success',
              onClose: () => {
                this.$router.go(-1)
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: res.content.tips,
              type: 'warning'
            })
          }
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
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    cancel: function() {
      this.$router.go(-1)
    }
  }
}
